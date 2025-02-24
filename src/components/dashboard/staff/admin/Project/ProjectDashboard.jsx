/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  LayoutGrid,
  ListFilter,
  Search,
  Building2,
  ArrowUpDown,
} from "lucide-react";
import ProjectStatus from "./ProjectStatus";
import Button from "../../../../fields/Button";

const ProjectDashboard = () => {
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state?.projectData?.projectData);
  const taskData = useSelector((state) => state.taskData.taskData);
  const userData = useSelector((state) => state.userData.staffData);

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fabricatorFilter, setFabricatorFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Prepare project data with associated tasks
  const projectsWithTasks = projectData.map((project) => ({
    ...project,
    tasks: taskData.filter((task) => task.project.id === project.id),
  }));

  useEffect(() => {
    let filtered = [...projectData];

    // Apply filters
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project?.status === statusFilter);
    }

    if (fabricatorFilter !== "all") {
      filtered = filtered.filter(
        (project) => project?.fabricator?.fabName === fabricatorFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Sort by fabricator name if applicable
      if (sortField === "fabricator") {
        aValue = a.fabricator?.fabName || "";
        bValue = b.fabricator?.fabName || "";
      }

      // Ensure case-insensitive comparison
      aValue = typeof aValue === "string" ? aValue.toLowerCase() : aValue;
      bValue = typeof bValue === "string" ? bValue.toLowerCase() : bValue;

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProjects(filtered);
  }, [
    searchTerm,
    statusFilter,
    fabricatorFilter,
    sortField,
    sortDirection,
    projectData,
    taskData,
  ]);

  // Calculate task statistics
  const completedTasks =
    taskData?.filter((task) => task?.status === "COMPLETE")?.length || 0;
  const inProgressTasks =
    taskData?.filter((task) => task?.status === "IN PROGRESS")?.length || 0;
  const assignedTask =
    taskData?.filter((task) => task?.status === "ASSINGED")?.length || 0;
  const inReviewTask =
    taskData?.filter((task) => task?.status === "IN REVIEW")?.length || 0;

  console.log(projectsWithTasks);

  // Chart data
  const barData = {
    labels: projectsWithTasks?.map((project) => project?.name) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: projectsWithTasks?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "COMPLETE")
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

  const lineData = {
    labels: projectsWithTasks?.map((project) => project?.name) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: projectsWithTasks?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "COMPLETE")
              ?.length || 0
        ),
        borderColor: "rgba(7, 179, 8, 0.8)",
        fill: false,
      },
      {
        label: "Tasks In Progress",
        data: projectsWithTasks?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "IN PROGRESS")
              ?.length || 0
        ),
        borderColor: "rgba(0, 255, 252, 0.9)",
        fill: false,
      },
      {
        label: "Tasks Assigned",
        data: projectsWithTasks?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "ASSINGED")
              ?.length || 0
        ),
        borderColor: "rgba(153, 102, 255, 0.6)",
        fill: false,
      },
    ],
  };

  const handleViewClick = (projectID) => {
    setSelectedProject(projectID);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">
      <div className=" mx-auto">
        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Task Overview</h3>
            <Bar data={barData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
            <Pie data={pieData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Task Trends</h3>
            <Line
              data={lineData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <ListFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="ASSINGED">Assigned</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="BREAK">In Break</option>
              <option value="ON HOLD">On Hold</option>
            </select>
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={fabricatorFilter}
              onChange={(e) => setFabricatorFilter(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Fabricators</option>
              {Array.from(
                new Set(projectData?.map((p) => p.fabricator?.fabName))
              ).map((fabricator) => (
                <option key={fabricator} value={fabricator}>
                  {fabricator}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
              <option value="fabricator">Sort by Fabricator</option>
              <option value="startDate">Sort by Start Date</option>
            </select>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Project List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="h-fit md:w-full w-[90vw] border-collapse text-center md:text-lg text-xs rounded-xl">
              <thead>
                <tr className="bg-teal-200/70">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    S.no
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Fabricator
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Tasks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project,index) => {
                  const projectTasks = taskData.filter(
                    (task) => task.project.id === project.id
                  );
                  const completedTasksCount = projectTasks.filter(
                    (task) => task.status === "COMPLETE"
                  ).length;
                  const progress = projectTasks.length
                    ? Math.round(
                        (completedTasksCount / projectTasks.length) * 100
                      )
                    : 0;

                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-blue-gray-100 border text-left"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {index+1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {project.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm ">
                          {project.fabricator?.fabName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm ">{project?.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            project.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : project.status === "COMPLETED"
                              ? "bg-blue-100 text-blue-800"
                              : project.status === "ON HOLD"
                              ? "bg-red-100 text-yellow-300"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {projectTasks.length} total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm ">{progress}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button onClick={() => handleViewClick(project.id)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedProject && (
        <ProjectStatus
          projectId={selectedProject}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default ProjectDashboard;
