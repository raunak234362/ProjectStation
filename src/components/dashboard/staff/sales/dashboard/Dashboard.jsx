/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Button, GetProject } from "../../../../index.js";
import { useState, useMemo } from "react";

const Dashboard = () => {
  const projects = useSelector((state) => state?.projectData.projectData);
  const staffs = useSelector((state) => state?.userData?.staffData?.data);
  const clients = useSelector((state) => state?.fabricatorData?.clientData);
  const user = useSelector((state) => state?.userData?.user); // optional: current logged-in user

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fabricatorFilter, setFabricatorFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "ascending" });

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);
  const handleFabricatorFilter = (e) => setFabricatorFilter(e.target.value);
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [projects, sortConfig]);

  const filteredProjects = sortedProjects.filter((project) => {
    const nameMatch = project.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === "" || project?.status === statusFilter;
    const fabricatorMatch = fabricatorFilter === "" || project?.fabricator?.fabName === fabricatorFilter;

    // optional: only show user's assigned projects
    // const assignedToUser = project.salesRep === user?.name;

    return nameMatch && statusMatch && fabricatorMatch;
  });

  const uniqueFabricators = [...new Set(projects.map((p) => p.fabricator?.fabName))];

  const handleViewClick = (id) => {
    setSelectedProject(id);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const statusCounts = useMemo(() => {
    const counts = {};
    projects.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return counts;
  }, [projects]);

  return (
    <div className="w-full h-[89vh] overflow-hidden mx-5">
      <div className="flex justify-center mt-4">
        <div className="text-3xl font-bold text-white bg-gradient-to-r from-green-500 to-teal-500 px-6 py-2 rounded-lg shadow-md">
          Sales Dashboard
        </div>
      </div>

      <div className="h-[85vh] mt-4 overflow-y-auto">
        {/* Metric cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 my-4">
          <MetricCard title="Total Projects" value={projects?.length} />
          <MetricCard title="Clients" value={clients?.length} />
          <MetricCard title="Staff Members" value={staffs?.length} />
          <MetricCard title="Completed Projects" value={statusCounts["COMPLETED"] || 0} />
        </div>

        {/* Status breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <MetricCard key={status} title={status} value={count} />
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white/70 p-4 rounded-lg mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by project name..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-md w-full md:w-1/3"
            />
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="px-4 py-2 border rounded-md w-full md:w-1/3"
            >
              <option value="">All Status</option>
              {["ASSIGNED", "ACTIVE", "ON-HOLD", "INACTIVE", "DELAY", "COMPLETED"].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={fabricatorFilter}
              onChange={handleFabricatorFilter}
              className="px-4 py-2 border rounded-md w-full md:w-1/3"
            >
              <option value="">All Fabricators</option>
              {uniqueFabricators.map((fab) => (
                <option key={fab} value={fab}>{fab}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/70 rounded-lg p-4 overflow-auto">
          <table className="min-w-full border-collapse text-sm text-left">
            <thead className="bg-teal-100 font-semibold">
              <tr>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("name")}>
                  Project Name {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("status")}>
                  Status {sortConfig.key === "status" && (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr><td colSpan="3" className="text-center p-4">No Projects Found</td></tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-100 border-b">
                    <td className="p-2">{project.name}</td>
                    <td className="p-2">{project.status}</td>
                    <td className="p-2">
                      <Button onClick={() => handleViewClick(project.id)}>View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

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
  );
};

const MetricCard = ({ title, value }) => (
  <div className="bg-white/80 p-4 rounded-lg shadow flex flex-col items-center">
    <div className="text-gray-700 font-semibold">{title}</div>
    <div className="text-2xl font-bold text-teal-600">{value}</div>
  </div>
);

export default Dashboard;
