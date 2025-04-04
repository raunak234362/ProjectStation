/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, GetProject } from "../../../../index.js";
import Service from "../../../../../config/Service.js";
import { showProjects } from "../../../../../store/projectSlice.js";

const ClientAllProjects = () => {
    const projects = useSelector((state) => state?.projectData?.projectData);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [fabricatorFilter, setFabricatorFilter] = useState("");
    const [sortConfig, setSortConfig] = useState({
      key: "",
      direction: "ascending",
    });
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const fetchproject = async () => {
      const response = await Service.allprojects(token);
      dispatch(showProjects(response?.data));
    };
    useEffect(() => {
      fetchproject();
    }, []);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleStatusFilter = (e) => {
      setStatusFilter(e.target.value);
    };
  
    const handleFabricatorFilter = (e) => {
      setFabricatorFilter(e.target.value);
    };
  
    const handleSort = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };
  
    const sortedProjects = [...projects].sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });
  
    const filteredProjects = sortedProjects?.filter((project) => {
      return (
        project?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) &&
        (statusFilter === "" || project?.status === statusFilter) &&
        (fabricatorFilter === "" || project?.fabricator === fabricatorFilter)
      );
    });

    const handleViewClick = async (projectID) => {
      setSelectedProject(projectID);
      setIsModalOpen(true);
    };
  
    const handleModalClose = async () => {
      setSelectedProject(null);
      setIsModalOpen(false);
    };
  
    return (
      <div className="bg-white/70 rounded-lg md:w-full w-[90vw] p-4">
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 mb-4 md:flex-row">
          <input
            type="text"
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-md md:w-1/4"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="w-full px-4 py-2 border rounded-md md:w-1/4"
          >
            <option value="">All Status</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="ON-HOLD">ON-HOLD</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="DELAY">DELAY</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
         
        </div>
  
        {/* Project Table */}
        <div className="mt-5 bg-white h-[50vh] overflow-auto rounded-lg">
          <table className="h-fit md:w-full w-[90vw] border-collapse text-center md:text-lg text-xs rounded-xl">
            <thead>
              <tr className="bg-teal-200/70">
                <th
                  className="px-2 py-1 text-left cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Project Name{" "}
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
               
                <th
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Project Status{" "}
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleSort("start_date")}
                >
                  Project Start Date{" "}
                  {sortConfig.key === "start_date" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleSort("approval_date")}
                >
                  Project End Date{" "}
                  {sortConfig.key === "approval_date" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects?.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan="6" className="text-center">
                    No Projects Found
                  </td>
                </tr>
              ) : (
                filteredProjects?.map((project, index) => (
                  <tr key={project.id} className="border hover:bg-blue-gray-100">
                    <td className="px-2 py-1 text-left border">
                      {project?.name}
                    </td>
                   
                    <td className="px-2 py-1 border">{project?.status}</td>
                    <td className="px-2 py-1 border">{project?.startDate}</td>
                    <td className="px-2 py-1 border">{project?.approvalDate}</td>
                    <td className="px-2 py-1 border">
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
        {/* {selectedProject && (
          <GetProject
            projectId={selectedProject}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        )} */}
      </div>
    );
  };

export default ClientAllProjects
