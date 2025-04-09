"use client"

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Bar, Pie, Line } from "react-chartjs-2"
import "chart.js/auto"
import {
  LayoutGrid,
  ListFilter,
  Search,
  Building2,
  ArrowUpDown,
  ChevronDown,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PauseCircle,
} from "lucide-react"
import ProjectStatus from "../Project/ProjectStatus"

const ProjectDashboard = () => {
  const dispatch = useDispatch()
  const userType = sessionStorage.getItem("userType");
  const projectData = useSelector((state) => state?.projectData?.projectData)
  const taskData = useSelector((state) => state.taskData.taskData)
  const userData = useSelector((state) => state.userData.staffData)
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [fabricatorFilter, setFabricatorFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [activeChart, setActiveChart] = useState("bar")
  const [departmentTask, setDepartmentTask] = useState([])
  
  useEffect(() => {
    if (userType === "department-manager") {
      const departmentTaskData = (taskData ?? []).flatMap((tasks) => tasks?.tasks);
      setDepartmentTask(departmentTaskData);
    }
  }, [userType, taskData])
  // console.log("Project With Task----------------", departmentTask)
  // Prepare project data with associated tasks
  const projectsWithTasks = projectData.map((project) => ({
    ...project,
    tasks: (userType === "department-manager" ? departmentTask : taskData).filter((task) => task?.project_id === project.id),
  }))
 
  useEffect(() => {
    let filtered = [...projectData]

    // Apply filters
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project?.status === statusFilter)
    }

    if (fabricatorFilter !== "all") {
      filtered = filtered.filter((project) => project?.fabricator?.fabName === fabricatorFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter((project) => project?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      // Sort by fabricator name if applicable
      if (sortField === "fabricator") {
        aValue = a.fabricator?.fabName || ""
        bValue = b.fabricator?.fabName || ""
      }

      // Ensure case-insensitive comparison
      aValue = typeof aValue === "string" ? aValue.toLowerCase() : aValue
      bValue = typeof bValue === "string" ? bValue.toLowerCase() : bValue

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredProjects(filtered)
  }, [searchTerm, statusFilter, fabricatorFilter, sortField, sortDirection, projectData])

  // Calculate task statistics
  const tasksToUse = userType === "department-manager" ? departmentTask : taskData;
  // console.log("Task Data----------------", tasksToUse)
  const completedTasks = tasksToUse?.filter((task) => task?.status === "COMPLETE")?.length || 0
  const inProgressTasks = tasksToUse?.filter((task) => task?.status === "IN_PROGRESS")?.length || 0
  const assignedTask = tasksToUse?.filter((task) => task?.status === "ASSIGNED")?.length || 0
  const inReviewTask = tasksToUse?.filter((task) => task?.status === "IN_REVIEW")?.length || 0

  // Chart data with improved colors
  const chartColors = {
    completed: "rgba(16, 185, 129, 0.8)", // green
    inProgress: "rgba(59, 130, 246, 0.8)", // blue
    assigned: "rgba(139, 92, 246, 0.8)", // purple
    inReview: "rgba(245, 158, 11, 0.8)", // amber
    onHold: "rgba(239, 68, 68, 0.8)", // red
  }

  // // Group tasks by fabricator for the bar chart
  const fabricatorTaskData = () => {
    // Get unique fabricators
    const fabricators = Array.from(new Set(projectData.map((p) => p.fabricator?.fabName).filter(Boolean)))

    // For each fabricator, count tasks by status
    return {
      labels: fabricators,
      datasets: [
        {
          label: "Tasks Completed",
          data: fabricators.map((fabName) => {
            const fabProjects = projectData.filter((p) => p.fabricator?.fabName === fabName)
            const fabProjectIds = fabProjects.map((p) => p.id)
            return tasksToUse.filter((task) => fabProjectIds.includes(task?.project_id) && task.status === "COMPLETE").length
          }),
          backgroundColor: chartColors.completed,
          borderRadius: 6,
        },
        {
          label: "Tasks In Review",
          data: fabricators.map((fabName) => {
            const fabProjects = projectData.filter((p) => p.fabricator?.fabName === fabName)
            const fabProjectIds = fabProjects.map((p) => p.id)
            return tasksToUse.filter((task) => fabProjectIds.includes(task?.project_id) && task.status === "IN_REVIEW")
              .length
          }),
          backgroundColor: chartColors.inReview,
          borderRadius: 6,
        },
        {
          label: "Tasks In Progress",
          data: fabricators.map((fabName) => {
            const fabProjects = projectData.filter((p) => p.fabricator?.fabName === fabName)
            const fabProjectIds = fabProjects.map((p) => p.id)
            return tasksToUse.filter((task) => fabProjectIds.includes(task?.project_id) && task.status === "IN_PROGRESS")
              .length
          }),
          backgroundColor: chartColors.inProgress,
          borderRadius: 6,
        },
        {
          label: "Tasks Assigned",
          data: fabricators.map((fabName) => {
            const fabProjects = projectData.filter((p) => p.fabricator?.fabName === fabName)
            const fabProjectIds = fabProjects.map((p) => p.id)
            return tasksToUse.filter((task) => fabProjectIds.includes(task?.project_id) && task.status === "ASSIGNED").length}),
          backgroundColor: chartColors.assigned,
          borderRadius: 6,
        },
      ],
    }
  }

  const barData = fabricatorTaskData()
  // const projectTaskData = () => {
  //   // Get unique projects
  //   const projects = projectData.map((p) => p.name)

  //   // For each project, count tasks by status
  //   return {
  //     labels: projects,
  //     datasets: [
  //       {
  //         label: "Tasks Completed",
  //         data: projects.map((projectName) => {
  //           const project = projectData.find((p) => p.name === projectName)
  //           return taskData?.filter((task) => task?.project?.id === project?.id && task?.status === "COMPLETE").length
  //         }),
  //         backgroundColor: chartColors.completed,
  //         borderRadius: 6,
  //       },
  //       {
  //         label: "Tasks In Review",
  //         data: projects.map((projectName) => {
  //           const project = projectData.find((p) => p.name === projectName)
  //           return taskData?.filter((task) => task?.project?.id === project?.id && task?.status === "IN_REVIEW").length
  //         }),
  //         backgroundColor: chartColors.inReview,
  //         borderRadius: 6,
  //       },
  //       {
  //         label: "Tasks In Progress",
  //         data: projects.map((projectName) => {
  //           const project = projectData.find((p) => p.name === projectName)
  //           return taskData?.filter((task) => task?.project?.id === project?.id && task?.status === "IN_PROGRESS").length
  //         }),
  //         backgroundColor: chartColors.inProgress,
  //         borderRadius: 6,
  //       },
  //       {
  //         label: "Tasks Assigned",
  //         data: projects.map((projectName) => {
  //           const project = projectData.find((p) => p.name === projectName)
  //           return taskData?.filter((task) => task?.project?.id === project?.id && task?.status === "ASSIGNED").length
  //         }),
  //         backgroundColor: chartColors.assigned,
  //         borderRadius: 6,
  //       },
  //     ],
  //   }
  // }

  // const barData = projectTaskData()

  const pieData = {
    labels: ["Completed", "In Progress", "Assigned", "In Review"],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, assignedTask, inReviewTask],
        backgroundColor: [chartColors.completed, chartColors.inProgress, chartColors.assigned, chartColors.inReview],
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  }

  const lineData = {
    labels: projectsWithTasks?.map((project) => project?.name) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: projectsWithTasks?.map(
          (project) => project?.tasks?.filter((task) => task?.status === "COMPLETE")?.length || 0,
        ),
        borderColor: chartColors.completed,
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: chartColors.completed,
        pointBorderColor: "#fff",
        pointRadius: 4,
      },
      {
        label: "Tasks In Progress",
        data: projectsWithTasks?.map(
          (project) => project?.tasks?.filter((task) => task?.status === "IN_PROGRESS")?.length || 0,
        ),
        borderColor: chartColors.inProgress,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: chartColors.inProgress,
        pointBorderColor: "#fff",
        pointRadius: 4,
      },
      {
        label: "Tasks Assigned",
        data: projectsWithTasks?.map(
          (project) => project?.tasks?.filter((task) => task?.status === "ASSIGNED")?.length || 0,
        ),
        borderColor: chartColors.assigned,
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: chartColors.assigned,
        pointBorderColor: "#fff",
        pointRadius: 4,
      },
    ],
  }

  // Calculate dynamic height for bar chart based on number of fabricators
  const getBarChartHeight = () => {
    const fabricatorCount = barData.labels.length
    // Base height plus additional height per fabricator
    const baseHeight = 300
    const heightPerFabricator = 40
    return Math.max(baseHeight, fabricatorCount * heightPerFabricator)
  }

  const handleViewClick = (projectID) => {
    setSelectedProject(projectID)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  // Get summary stats
  const totalProjects = projectData.length
  const activeProjects = projectData.filter((p) => p.status === "ACTIVE").length
  const totalTasks = taskData.length
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="p-4 sm:p-6 w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="w-full mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Project Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-500">Track and manage all your projects in one place</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Total Projects</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{totalProjects}</h3>
              </div>
              <div className="bg-blue-50 p-2 sm:p-3 rounded-full">
                <LayoutGrid className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Active Projects</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{activeProjects}</h3>
              </div>
              <div className="bg-green-50 p-2 sm:p-3 rounded-full">
                <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Total Tasks</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{totalTasks}</h3>
              </div>
              <div className="bg-purple-50 p-2 sm:p-3 rounded-full">
                <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Completion Rate</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{completionRate}%</h3>
              </div>
              <div className="bg-amber-50 p-2 sm:p-3 rounded-full">
                <PieChart className="w-4 h-4 sm:w-6 sm:h-6 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section with Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 sm:mb-8 overflow-hidden">
          <div className="border-b border-gray-100 overflow-x-auto">
            <div className="flex min-w-max">
              <button
                onClick={() => setActiveChart("bar")}
                className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors ${
                  activeChart === "bar"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Fabricator Task Overview
              </button>
              <button
                onClick={() => setActiveChart("pie")}
                className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors ${
                  activeChart === "pie"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <PieChart className="w-4 h-4" />
                Task Distribution
              </button>
              <button
                onClick={() => setActiveChart("line")}
                className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors ${
                  activeChart === "line"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LineChart className="w-4 h-4" />
                Task Trends
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="w-full" style={{ height: activeChart === "bar" ? `${getBarChartHeight()}px` : "400px" }}>
              {activeChart === "bar" && (
                <Bar
                  data={barData}
                  options={{
                    indexAxis: "y", // This makes the bar chart horizontal
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          usePointStyle: true,
                          boxWidth: 6,
                          font: {
                            size: 12,
                          },
                        },
                      },
                      tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        padding: 12,
                        titleFont: {
                          size: 14,
                        },
                        bodyFont: {
                          size: 13,
                        },
                        cornerRadius: 8,
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                        grid: {
                          color: "rgba(0, 0, 0, 0.05)",
                        },
                        stacked: true,
                      },
                      y: {
                        grid: {
                          display: false,
                        },
                        stacked: true,
                        ticks: {
                          // Ensure fabricator names are fully visible
                          callback: function (value) {
                            const label = this.getLabelForValue(value)
                            // Truncate long fabricator names on small screens
                            const maxLength = window.innerWidth < 768 ? 15 : 25
                            return label.length > maxLength ? label.substring(0, maxLength) + "..." : label
                          },
                        },
                      },
                    },
                  }}
                />
              )}
              {activeChart === "pie" && (
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: window.innerWidth < 768 ? "bottom" : "right",
                        labels: {
                          usePointStyle: true,
                          padding: window.innerWidth < 768 ? 10 : 20,
                          font: {
                            size: 12,
                          },
                        },
                      },
                      tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        padding: 12,
                        titleFont: {
                          size: 14,
                        },
                        bodyFont: {
                          size: 13,
                        },
                        cornerRadius: 8,
                      },
                    },
                  }}
                />
              )}
              {activeChart === "line" && (
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          usePointStyle: true,
                          boxWidth: 6,
                          font: {
                            size: 12,
                          },
                        },
                      },
                      tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        padding: 12,
                        titleFont: {
                          size: 14,
                        },
                        bodyFont: {
                          size: 13,
                        },
                        cornerRadius: 8,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                        ticks: {
                          // Handle long project names
                          callback: function (value) {
                            const label = this.getLabelForValue(value)
                            // Truncate long project names
                            const maxLength = window.innerWidth < 768 ? 8 : 15
                            return label.length > maxLength ? label.substring(0, maxLength) + "..." : label
                          },
                          maxRotation: 45,
                          minRotation: 45,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: "rgba(0, 0, 0, 0.05)",
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Filter Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            <div className="relative">
              <ListFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 sm:pl-10 p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="COMPLETE">Completed</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="BREAK">In Break</option>
                <option value="ONHOLD">On Hold</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            </div>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <select
                value={fabricatorFilter}
                onChange={(e) => setFabricatorFilter(e.target.value)}
                className="w-full pl-9 sm:pl-10 p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              >
                <option value="all">All Fabricators</option>
                {Array.from(new Set(projectData?.map((p) => p.fabricator?.fabName))).map((fabricator) => (
                  <option key={fabricator} value={fabricator}>
                    {fabricator}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            </div>

            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full pl-9 sm:pl-10 p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
                <option value="fabricator">Sort by Fabricator</option>
                <option value="startDate">Sort by Start Date</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Project List</h3>
            <div className="text-xs sm:text-sm text-gray-500">{filteredProjects.length} projects found</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    S.no
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Fabricator
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Tasks
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProjects.map((project, index) => {
                  const projectTasks = tasksToUse.filter((task) => task?.project_id === project.id)
                  const completedTasksCount = projectTasks.filter((task) => task.status === "COMPLETE").length
                  const progress = projectTasks.length
                    ? Math.round((completedTasksCount / projectTasks.length) * 100)
                    : 0

                  // Status icon mapping
                  let StatusIcon = CheckCircle2
                  let statusColor = "text-green-500"
                  let statusBgColor = "bg-green-50"

                  if (project.status === "ACTIVE") {
                    StatusIcon = Loader2
                    statusColor = "text-blue-500"
                    statusBgColor = "bg-blue-50"
                  } else if (project.status === "ONHOLD") {
                    StatusIcon = PauseCircle
                    statusColor = "text-amber-500"
                    statusBgColor = "bg-amber-50"
                  } else if (project.status === "BREAK") {
                    StatusIcon = AlertCircle
                    statusColor = "text-red-500"
                    statusBgColor = "bg-red-50"
                  }

                  return (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{index + 1}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{project.name}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm text-gray-700">{project.fabricator?.fabName}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm text-gray-700">{project?.endDate}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${statusBgColor} ${statusColor}`}
                        >
                          <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-700 font-medium">{projectTasks.length}</div>
                        <div className="text-xs text-gray-500">{completedTasksCount} completed</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2">
                          <div
                            className={`h-1.5 sm:h-2 rounded-full ${
                              progress > 75
                                ? "bg-green-500"
                                : progress > 50
                                  ? "bg-blue-500"
                                  : progress > 25
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 inline-block">{progress}% complete</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewClick(project.id)}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs sm:text-sm font-medium rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filteredProjects.length === 0 && (
            <div className="py-8 sm:py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-3 sm:mb-4">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">No projects found</h3>
              <p className="text-xs sm:text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
      {selectedProject && (
        <ProjectStatus
          projectId={selectedProject}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
        />
      )}
    </div>
  )
}

export default ProjectDashboard

