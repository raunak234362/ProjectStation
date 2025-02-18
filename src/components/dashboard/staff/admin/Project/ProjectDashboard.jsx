/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

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

  useEffect(() => {
    let filtered = projectData;

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

    setFilteredProjects(filtered);
  }, [projectData, searchTerm, statusFilter, fabricatorFilter]);

  useEffect(() => {
    // Dispatch actions to fetch data if needed
  }, []); // Removed dispatch from dependencies

  const completedTasks = taskData?.filter((task) => task?.status === "COMPLETED")?.length || 0;
  const inProgressTasks = taskData?.filter((task) => task?.status === "IN PROGRESS")?.length || 0;
  const assignedTask = taskData?.filter((task) => task?.status === "Assigned")?.length || 0;

  const barData = {
    labels: projectData?.map((project) => project?.name) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: projectData?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "COMPLETED")
              ?.length || 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Tasks In Progress",
        data: projectData?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "IN PROGRESS")
              ?.length || 0
        ),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "In Progress", "Assigned"],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, assignedTask],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  const lineData = {
    labels: projectData?.map((project) => project?.name) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: projectData?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "completed")
              ?.length || 0
        ),
        borderColor: "rgba(75, 192, 192, 0.6)",
        fill: false,
      },
      {
        label: "Tasks In Progress",
        data: projectData?.map(
          (project) =>
            project?.tasks?.filter((task) => task?.status === "in-progress")
              ?.length || 0
        ),
        borderColor: "rgba(153, 102, 255, 0.6)",
        fill: false,
      },
    ],
  };

  const userContributionData = {
    labels:
      taskData
        ?.filter((task) => task.project_id === selectedProject)
        ?.map((task) => {
          const user = userData?.find((user) => user.id === task.user_id);
          return user ? `${user.f_name} ${user.l_name}` : "Unknown User";
        }) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data:
          taskData
            ?.filter((task) => task.project_id === selectedProject)
            ?.map((task) => (task.status === "COMPLETED" ? 1 : 0)) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Tasks Assigned",
        data:
          taskData
            ?.filter((task) => task.project_id === selectedProject)
            ?.map((task) => 1) || [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Hours Taken",
        data:
          taskData
            ?.filter((task) => task.project_id === selectedProject)
            ?.map((task) => task.hours_taken || 0) || [],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const totalAssignedHours =
    taskData
      ?.filter((task) => task.project_id === selectedProject)
      ?.reduce((total, task) => total + (task.duration || 0), 0) || 0;
  const totalHoursTaken =
    taskData
      ?.filter((task) => task.project_id === selectedProject)
      ?.reduce(
        (total, task) => total + (task.workingHourTask?.duration || 0),
        0
      ) || 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Project Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={fabricatorFilter}
            onChange={(e) => setFabricatorFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Fabricators</option>
            {Array.from(new Set(projectData?.map((p) => p.fabricator?.fabName))).map(
              (fabricator) => (
                <option key={fabricator} value={fabricator}>
                  {fabricator}
                </option>
              )
            )}
          </select>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Project</option>
            {projectData?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Tasks Overview</h3>
            <Bar data={barData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Task Distribution</h3>
            <Pie data={pieData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Task Trends</h3>
            <Line data={lineData} />
          </div>
        </div>

        {selectedProject && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">User Contribution</h3>
              <Bar data={userContributionData} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Task Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="text-lg text-green-800 font-semibold">Completed Tasks</p>
                  <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg">
                  <p className="text-lg text-orange-800 font-semibold">In Progress Tasks</p>
                  <p className="text-3xl font-bold text-orange-600">{inProgressTasks}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-lg text-blue-800 font-semibold">Total Assigned Hours</p>
                  <p className="text-3xl font-bold text-blue-600">{totalAssignedHours}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                  <p className="text-lg text-red-800 font-semibold">Total Hours Taken</p>
                  <p className="text-3xl font-bold text-red-600">{totalHoursTaken}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;