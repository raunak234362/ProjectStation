/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Button, GetProject } from "../../../../index.js";
import { useState } from "react";

const Dashboard = () => {
  const projects = useSelector((state) => state?.projectData.projectData);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fabricatorFilter, setFabricatorFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

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

  const filteredProjects = sortedProjects.filter((project) => {
    return (
      project.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || project?.status === statusFilter) &&
      (fabricatorFilter === "" || project?.fabricator?.fabName === fabricatorFilter)
    );
  });

  // Get unique fabricator names for the filter dropdown.
  const uniqueFabricators = [
    ...new Set(projects.map((project) => project.fabricator?.fabName)),
  ];

  const handleViewClick = async (fabricatorId) => {
    setSelectedProject(fabricatorId);
    setIsModalOpen(true);
  };

  console.log(selectedProject);

  const handleModalClose = async () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  // Count the number of completed projects
  const completedProjectsCount = projects.filter(
    (project) => project.status === "COMPLETED"
  ).length;

  return (
    <div className="w-full h-[89vh] overflow-y-hidden mx-5">
      <div className="flex w-full justify-center items-center">
        <div className="text-3xl font-bold text-white bg-green-500/70 shadow-xl px-5 py-1 mt-2 rounded-lg">
          Dashboard
        </div>
      </div>

      <div className="h-[85vh] mt-2 overflow-y-auto">
        <div className="my-5 grid md:grid-cols-3 grid-cols-1 gap-5">
          <div className="grid text-center md:grid-cols-2 grid-cols-2 gap-5 ">
            <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
              <div className="font-bold text-base text-gray-800">
                All Projects
              </div>
              {/* <div className="text-3xl font-bold">{projects.length}</div> */}
            </div>
            <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
              <div className="font-bold text-base text-gray-800">
                All Fabricators
              </div>
              <div className="text-3xl font-bold">{completedProjectsCount}</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
              <div className="font-bold text-base text-gray-800">
                All Clients
              </div>
              <div className="text-3xl font-bold">{completedProjectsCount}</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
              <div className="font-bold text-base text-gray-800">
                All Vendor
              </div>
              <div className="text-3xl font-bold">{completedProjectsCount}</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
              <div className="font-bold text-base text-gray-800">
                Submittals
              </div>
              <div className="text-3xl font-bold">{completedProjectsCount}</div>
            </div>

            <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
              <div className="font-bold text-base text-gray-800">RFIs</div>
              <div className="text-3xl font-bold">{completedProjectsCount}</div>
            </div>
          </div>

          {/* pie chart */}
          <div className="bg-white/70 rounded-lg md:w-full w-[90vw] p-4">
            WBT Project completion status
            <img
              src="https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg"
              alt=""
            />
          </div>
          <div className="bg-white/70 rounded-lg md:w-full w-[90vw] p-4">
            Vendor Project completion status
            <img
              src="https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg"
              alt=""
            />
          </div>
        </div>
        {/* Project Table */}
        <div className="overflow-x-auto">
          <div className="bg-white/70 rounded-lg md:w-full w-[90vw] p-4">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search by project name..."
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 border rounded-md w-full md:w-1/4"
              />
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="px-4 py-2 border rounded-md w-full md:w-1/4"
              >
                <option value="">All Status</option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="ON-HOLD">ON-HOLD</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="DELAY">DELAY</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
              <select
                value={fabricatorFilter}
                onChange={handleFabricatorFilter}
                className="px-4 py-2 border rounded-md w-full md:w-1/4"
              >
                <option value="">All Fabricators</option>
                {uniqueFabricators.map((fabricator) => (
                  <option key={fabricator} value={fabricator}>
                    {fabricator}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Table */}
            <div className="mt-5 bg-white h-[30vh] overflow-y-auto rounded-lg">
              <table className=" md:w-full overflow-auto w-[90vw] border-collapse text-center md:text-lg text-xs rounded-xl">
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

                    <th className="px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody className="">
                  {filteredProjects.length === 0 ? (
                    <tr className="bg-white">
                      <td colSpan="6" className="text-center">
                        No Projects Found
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((project, index) => (
                      <tr
                        key={project.id}
                        className="hover:bg-blue-gray-100 border"
                      >
                        <td className="border px-2 py-1 text-left">
                          {project.name}
                        </td>

                        <td className="border px-2 py-1">{project.status}</td>

                        <td className="border px-2 py-1">
                          <Button onClick={() => handleViewClick(project.id)}>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
