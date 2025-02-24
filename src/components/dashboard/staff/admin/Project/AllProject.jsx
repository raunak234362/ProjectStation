/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CustomSelect, GetProject } from "../../../../index.js";
import Service from "../../../../../config/Service.js";
import { showProjects } from "../../../../../store/projectSlice.js";

const AllProjects = () => {
  const projects = useSelector((state) => state?.projectData?.projectData);
  const fabricators = useSelector(
    (state) => state?.fabricatorData?.fabricatorData
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState({ key: "name", order: "asc" });
  const [filters, setFilters] = useState({
    fabricator: "",
    status: "",
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    setProjectFilter(projects);
  }, [projects]);

  const filterAndSortData = () => {
    let filtered = projects?.filter((project) => {
      const searchMatch = project?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      const filterMatch =
        (!filters?.fabricator ||
          project?.fabricator?.fabName === filters?.fabricator) &&
        (!filters?.status || project?.status === filters?.status);

      return searchMatch && filterMatch;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aKey = a[sortOrder?.key];
      let bKey = b[sortOrder?.key];

      // Handle fabricator sorting separately
      if (sortOrder?.key === "fabricator") {
        aKey = a.fabricator?.fabName || "";
        bKey = b.fabricator?.fabName || "";
      }

      // Convert only if it's a string
      const aValue = typeof aKey === "string" ? aKey.toLowerCase() : aKey ?? "";
      const bValue = typeof bKey === "string" ? bKey.toLowerCase() : bKey ?? "";

      if (sortOrder?.order === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
    setProjectFilter(filtered);
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter change handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Sort handler
  const handleSort = (key) => {
    const order =
      sortOrder.key === key && sortOrder.order === "asc" ? "desc" : "asc";
    setSortOrder({ key, order });
  };

  const handleViewClick = (projectID) => {
    setSelectedProject(projectID);
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    filterAndSortData();
  }, [searchQuery, filters, sortOrder, projects]);

  return (
    <div className="bg-white/70 rounded-lg md:w-full w-[90vw] p-4">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded w-full mb-4"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Fabricator Filter */}
          <select
            name="fabricator"
            value={filters.fabricator}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">All Fabricator</option>
            {fabricators?.map((fab) => (
              <option key={fab.id} value={fab.fabName}>
                {fab.fabName}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="ON-HOLD">ON-HOLD</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="DELAY">DELAY</option>
            <option value="COMPLETE">COMPLETED</option>
          </select>
        </div>
      </div>

      {/* Project Table */}
      <div className="mt-5 bg-white h-[50vh] overflow-auto rounded-lg">
        <table className="h-fit md:w-full w-[90vw] border-collapse text-center md:text-lg text-xs rounded-xl">
          <thead>
            <tr className="bg-teal-200/70">
              {[
                "s.no",
                "name",
                "fabricator",
                "status",
                "startDate",
                "approvalDate",
              ].map((key) => (
                <th
                  key={key}
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0)?.toUpperCase() + key.slice(1)}
                  {sortOrder.key === key &&
                    (sortOrder.order === "asc" ? "" : "")}
                </th>
              ))}
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectFilter?.length === 0 ? (
              <tr className="bg-white">
                <td colSpan="7" className="text-center">
                  No Projects Found
                </td>
              </tr>
            ) : (
              projectFilter?.map((project, index) => (
                <tr key={project.id} className="hover:bg-blue-gray-100 border">
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{project?.name}</td>
                  <td className="border px-2 py-1">
                    {project?.fabricator?.fabName || "N/A"}
                  </td>
                  <td className="border px-2 py-1">
                    {project?.status || "N/A"}
                  </td>
                  <td className="border px-2 py-1">
                    {project?.startDate || "N/A"}
                  </td>
                  <td className="border px-2 py-1">
                    {project?.approvalDate || "N/A"}
                  </td>
                  <td className="border px-2 py-1">
                    <Button onClick={() => handleViewClick(project?.id)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedProject && (
        <GetProject
          projectId={selectedProject}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default AllProjects;
