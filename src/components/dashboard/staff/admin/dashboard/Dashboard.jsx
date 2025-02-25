/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Button, GetProject } from "../../../../index.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ArrowUpDown, Building2, ListFilter, Search, Target, UsersRound } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { GiOrganigram } from "react-icons/gi";
import { FaHourglassEnd } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import ProjectStatus from "../Project/ProjectStatus.jsx";

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
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fabricatorFilter, setFabricatorFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");



  const handleViewClick = async (fabricatorId) => {
    setSelectedProject(fabricatorId);
    setIsModalOpen(true);
  };

  console.log(selectedProject);

  const handleModalClose = async () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  // Prepare project data with associated tasks
   
  
    useEffect(() => {
      let filtered = [...projects];
  
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
      projects,
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
          <div className="bg-white rounded-lg md:w-full w-[90vw] p-4 text-center font-bold">
            Notification Option Coming Soon
          </div>
        </div>
        {/* Project Table */}
        <div className="overflow-x-auto">
          <div className="bg-white/70 rounded-lg md:w-full w-[90vw] p-4">
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
                new Set(projects?.map((p) => p.fabricator?.fabName))
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
        <div className="bg-white h-[35vh] rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Project List</h3>
          </div>
          <div className="overflow-x-auto overflow-y-auto">
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
            
            {selectedProject && (
              <ProjectStatus
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
