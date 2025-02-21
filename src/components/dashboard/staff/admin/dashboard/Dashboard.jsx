/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Button, GetProject } from "../../../../index.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useState } from "react";
import { Target, UsersRound } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { GiOrganigram } from "react-icons/gi";
import { FaHourglassEnd } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";

const Dashboard = () => {
  const projects = useSelector((state) => state?.projectData.projectData);
  const fabricators = useSelector((state) => state?.fabricatorData?.fabricatorData);
  const staffs = useSelector((state) => state?.userData?.staffData);
  const clients = useSelector((state) => state?.fabricatorData?.clientData);
  const taskData = useSelector((state) => state?.taskData?.taskData);
  const projectsWithTasks = projects.map((project) => ({
    ...project,
    tasks: taskData.filter((task) => task.project.id === project.id),
  }));

  console.log("clients", clients);
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
      (fabricatorFilter === "" ||
        project?.fabricator?.fabName === fabricatorFilter)
    );
  });

  // Get unique fabricator names for the filter dropdown.
  const uniqueFabricators = [
    ...new Set(projects.map((project) => project.fabricator?.name)),
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

  // Calculate task statistics
  const completedTasks =
    taskData?.filter((task) => task?.status === "COMPLETED")?.length || 0;
  const inProgressTasks =
    taskData?.filter((task) => task?.status === "IN PROGRESS")?.length || 0;
  const assignedTask =
    taskData?.filter((task) => task?.status === "ASSINGED")?.length || 0;
  const inReviewTask =
    taskData?.filter((task) => task?.status === "IN REVIEW")?.length || 0;

  const barData = {
    labels: projectsWithTasks?.map((project) => project?.name) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: projectsWithTasks?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "COMPLETED")
              ?.length || 0
        ),
        backgroundColor: "rgba(7, 179, 8, 0.8)",
      },
      {
        label: "Tasks In Review",
        data: projectsWithTasks?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "IN REVIEW")
              ?.length || 0
        ),
        backgroundColor: "rgba(242, 255, 4, 0.9)",
      },
      {
        label: "Tasks In Progress",
        data: projectsWithTasks?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "IN PROGRESS")
              ?.length || 0
        ),
        backgroundColor: "rgba(0, 255, 252, 0.9)",
      },
      {
        label: "Tasks Assigned",
        data: projectsWithTasks?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "ASSINGED")
              ?.length || 0
        ),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "In Progress", "Assigned", "In Review"],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, assignedTask, inReviewTask],
        backgroundColor: [
          "rgba(7, 179, 8, 0.8)",
          "rgba(0, 255, 252, 0.9)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(242, 255, 4, 0.9)",
        ],
      },
    ],
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
            <div className="flex flex-row justify-center items-center gap-5 bg-white rounded-lg p-3 shadow-lg">
              <Target className="text-green-400" />
              <div className="flex flex-col justify-start items-start">
                <div className="font-bold text-base text-green-600">
                  All Projects
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {projects?.length}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-5 bg-white rounded-lg p-3 shadow-lg">
              <UsersRound className="text-3xl text-blue-700" />
              <div className="flex flex-col justify-start items-start">
                <div className="font-bold text-base text-blue-800">
                  All Staff
                </div>
                <div className="text-3xl font-bold text-blue-700">
                  {staffs?.length}
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-5 bg-white rounded-lg p-3 shadow-lg">
              <GiOrganigram className="text-3xl text-blue-700" />
              <div className="flex flex-col justify-start items-start">
                <div className="font-bold text-base text-blue-800">
                  All Vendor
                </div>
                <div className="text-3xl font-bold text-blue-700">
                  {completedProjectsCount}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-5 bg-white rounded-lg p-3 shadow-lg">
              <PiUsersThree className="text-3xl text-green-400" />
              <div className="flex flex-col justify-start items-start">
                <div className="font-bold text-base text-green-600">
                  All Clients
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {clients?.length}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-5 bg-white rounded-lg p-3 shadow-lg">
              <FaHourglassEnd className="text-2xl text-green-400" />
              <div className="flex flex-col justify-start items-start">
                <div className="font-bold text-base text-green-600">
                  Submittals
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {completedProjectsCount}
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-5 bg-white rounded-lg p-3 shadow-lg">
              <GrCircleInformation className="text-3xl text-blue-700"/>
              <div className="flex flex-col justify-start items-start">
                <div className="font-bold text-base  text-blue-800">RFIs</div>
                <div className="text-3xl font-bold text-blue-700">
                  {completedProjectsCount}
                </div>
              </div>
            </div>
          </div>

          {/* pie chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Task Overview</h3>
            <Bar data={barData} />
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
                {fabricators?.map((fab) => (
              <option key={fab.id} value={fab.fabName}>
                {fab.fabName}
              </option>
            ))}
              </select>
            </div>

            {/* Project Table */}
            <div className="mt-5 bg-white h-[38vh] overflow-y-auto rounded-lg">
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
