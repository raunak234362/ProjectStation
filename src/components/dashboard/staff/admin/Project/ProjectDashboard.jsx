/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showProjects } from "../../../../../store/projectSlice.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { showTask } from "../../../../../store/taskSlice";

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
  console.log(userData);

  useEffect(() => {
    let filtered = projectData;

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project?.status === statusFilter);
    }

    if (fabricatorFilter !== "all") {
      filtered = filtered.filter(
        (project) => project?.fabricator === fabricatorFilter
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
    dispatch(showProjects());
    dispatch(showTask());
  }, [dispatch]);

  const completedTasks = taskData?.filter(task => task?.status === "COMPLETED")?.length || 0;
  const inProgressTasks = taskData?.filter(task => task?.status === "IN PROGRESS")?.length || 0;
  const assignedTask = taskData?.filter(task => task?.status === "Assigned")?.length || 0;

  const barData = {
    labels: projectData?.map(project => project?.name) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: projectData?.map(project => project?.tasks?.filter(task => task?.status === "COMPLETED")?.length || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Tasks In Progress",
        data: projectData?.map(project => project?.tasks?.filter(task => task?.status === "IN PROGRESS")?.length || 0),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "In Progress", "Assigned"],
    datasets: [
      {
        data: [completedTasks, inProgressTasks,assignedTask],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)","rgba(65,102,255,0.6)"],
      },
    ],
  };

  const lineData = {
    labels: projectData?.map(project => project?.name) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: projectData?.map(project => project?.tasks?.filter(task => task?.status === "completed")?.length || 0),
        borderColor: "rgba(75, 192, 192, 0.6)",
        fill: false,
      },
      {
        label: "Tasks In Progress",
        data: projectData?.map(project => project?.tasks?.filter(task => task?.status === "in-progress")?.length || 0),
        borderColor: "rgba(153, 102, 255, 0.6)",
        fill: false,
      },
    ],
  };

  const userContributionData = {
    labels: taskData?.filter(task => task.project_id === selectedProject)?.map(task => {
      const user = userData?.find(user => user.id === task.user_id);
      return user ? `${user.f_name} ${user.l_name}` : "Unknown User";
    }) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: taskData?.filter(task => task.project_id === selectedProject)?.map(task => task.status === "COMPLETED" ? 1 : 0) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Tasks Assigned",
        data: taskData?.filter(task => task.project_id === selectedProject)?.map(task => 1) || [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Hours Taken",
        data: taskData?.filter(task => task.project_id === selectedProject)?.map(task => task.hours_taken || 0) || [],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const totalAssignedHours = taskData?.filter(task => task.project_id === selectedProject)?.reduce((total, task) => total + (task.duration || 0), 0) || 0;
  const totalHoursTaken = taskData?.filter(task => task.project_id === selectedProject)?.reduce((total, task) => total + (task.workingHourTask?.duration || 0), 0) || 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={fabricatorFilter}
          onChange={(e) => setFabricatorFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Fabricators</option>
          {Array.from(new Set(projectData?.map((p) => p.fabricator))).map((fabricator) => (
            <option key={fabricator.id} value={fabricator.fabName}>
              {fabricator.fabName}
            </option>
          ))}
        </select>

        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Project</option>
          {projectData?.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div className=" mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Project Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-4 shadow-md rounded-xl">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Tasks Overview (Bar Chart)
            </h3>
            <Bar data={barData} />
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 shadow-md rounded-xl">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Task Distribution (Pie Chart)
            </h3>
            <Pie data={pieData} />
          </div>

          {/* Line Chart */}
          <div className="bg-white p-4 shadow-md rounded-xl">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Task Trends (Line Chart)
            </h3>
            <Line data={lineData} />
          </div>

          {/* User Contribution Bar Chart */}
          {selectedProject && (
            <div className="bg-white p-4 shadow-md rounded-xl">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                User Contribution (Bar Chart)
              </h3>
              <Bar data={userContributionData} />
            </div>
          )}
        </div>

        {/* Task Summary */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Task Summary</h3>
          <div className="flex justify-between mt-3">
            <p className="text-lg text-green-600 font-semibold">
              ✅ Completed Tasks: {completedTasks}
            </p>
            <p className="text-lg text-orange-600 font-semibold">
              ⏳ In Progress Tasks: {inProgressTasks}
            </p>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-lg text-blue-600 font-semibold">
              ⏱️ Total Assigned Hours: {totalAssignedHours}
            </p>
            <p className="text-lg text-red-600 font-semibold">
              ⏱️ Total Hours Taken: {totalHoursTaken}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
