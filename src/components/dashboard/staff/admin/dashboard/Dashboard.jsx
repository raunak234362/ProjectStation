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

  // Prepare project data with associated tasks
  const projectsWithTasks = projectData?.map((project) => ({
    ...project,
    tasks: taskData?.filter((task) => task?.project?.id === project?.id),
  }))

  useEffect(() => {
    let filtered = [...projectData]

    // Apply filters
    if (statusFilter !== "all") {
      filtered = filtered?.filter((project) => project?.status === statusFilter)
    }

    if (fabricatorFilter !== "all") {
      filtered = filtered?.filter((project) => project?.fabricator?.fabName === fabricatorFilter)
    }

    if (searchTerm) {
      filtered = filtered?.filter((project) => project?.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
  const completedTasks = taskData?.filter((task) => task?.status === "COMPLETE")?.length || 0
  const inProgressTasks = taskData?.filter((task) => task?.status === "IN_PROGRESS")?.length || 0
  const assignedTask = taskData?.filter((task) => task?.status === "ASSIGNED")?.length || 0
  const inReviewTask = taskData?.filter((task) => task?.status === "IN_REVIEW")?.length || 0
  const inBreakTask = taskData?.filter((task) => task?.status === "BREAK")?.length || 0

  // Chart data with improved colors
  const chartColors = {
    completed: "rgba(16, 185, 129, 0.8)", // green
    inProgress: "rgba(59, 130, 246, 0.8)", // blue
    assigned: "rgba(139, 92, 246, 0.8)", // purple
    inReview: "rgba(245, 158, 11, 0.8)", // amber
    onHold: "rgba(239, 68, 68, 0.8)", // red
    inBreak:"rgba(156, 163, 175, 0.8)", // gray
  }

  // Group tasks by fabricator for the bar chart
  const projectTaskData = () => {
    // Get unique projects
    const projects = projectData.map((p) => p.name)

    // For each project, count tasks by status
    return {
      labels: projects,
      datasets: [
        {
          label: "Tasks Completed",
          data: projects.map((projectName) => {
            const project = projectData.find((p) => p.name === projectName)
            return taskData?.filter((task) => task?.project?.id === project?.id && task?.status === "COMPLETE").length
          }),
          backgroundColor: chartColors.completed,
          borderRadius: 6,
        },
        {
          label: "Tasks In Review",
          data: projects.map((projectName) => {
            const project = projectData.find((p) => p.name === projectName)
            return taskData?.filter((task) => task?.project?.id === project?.id && task?.status === "IN_REVIEW").length
          }),
          backgroundColor: chartColors.inReview,
          borderRadius: 6,
        },
        {
          label: "Tasks In Progress",
          data: projects.map((projectName) => {
            const project = projectData.find((p) => p.name === projectName)
            return taskData?.filter((task) => task?.project?.id === project?.id && task?.status === "IN_PROGRESS").length
          }),
          backgroundColor: chartColors.inProgress,
          borderRadius: 6,
        },
        {
          label: "Tasks Assigned",
          data: projects.map((projectName) => {
            const project = projectData.find((p) => p.name === projectName)
            return taskData?.filter((task) => task?.project?.id === project?.id && task?.status === "ASSIGNED").length
          }),
          backgroundColor: chartColors.assigned,
          borderRadius: 6,
        },
      ],
    }
  }

  const barData = projectTaskData()

  const pieData = {
    labels: ["Complete", "In Progress", "Assigned", "In Review", "In Break"],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, assignedTask, inReviewTask, inBreakTask],
        backgroundColor: [chartColors.completed, chartColors.inProgress, chartColors.assigned, chartColors.inReview, chartColors.inBreak],
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
          (project) => project?.tasks?.filter((task) => task?.status === "IN PROGRESS")?.length || 0,
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
          (project) => project?.tasks?.filter((task) => task?.status === "ASSINGED")?.length || 0,
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
    <div className="w-full my-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
    
      <div className="w-full h-screen px-5 mx-auto my-5 overflow-y-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-center text-gray-800 sm:text-3xl">Dashboard</h1>
          <p className="text-sm text-gray-500 sm:text-base">Track and manage all your projects in one place</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:mb-8">
          <div className="p-4 transition-all bg-white border border-gray-100 shadow-sm rounded-xl sm:p-6 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">Total Projects</p>
                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">{totalProjects}</h3>
              </div>
              <div className="p-2 rounded-full bg-blue-50 sm:p-3">
                <LayoutGrid className="w-4 h-4 text-blue-500 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="p-4 transition-all bg-white border border-gray-100 shadow-sm rounded-xl sm:p-6 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">Active Projects</p>
                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">{activeProjects}</h3>
              </div>
              <div className="p-2 rounded-full bg-green-50 sm:p-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="p-4 transition-all bg-white border border-gray-100 shadow-sm rounded-xl sm:p-6 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">Total Tasks</p>
                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">{totalTasks}</h3>
              </div>
              <div className="p-2 rounded-full bg-purple-50 sm:p-3">
                <CheckCircle2 className="w-4 h-4 text-purple-500 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="p-4 transition-all bg-white border border-gray-100 shadow-sm rounded-xl sm:p-6 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">Completion Rate</p>
                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">{completionRate}%</h3>
              </div>
              <div className="p-2 rounded-full bg-amber-50 sm:p-3">
                <PieChart className="w-4 h-4 sm:w-6 sm:h-6 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section with Tabs */}
        <div className="mb-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl sm:mb-8">
          <div className="overflow-x-auto border-b border-gray-100">
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
                Project Task Overview
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
                <div className="w-full h-full">

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
                </div>
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
        <div className="p-4 mb-6 bg-white border border-gray-100 shadow-sm rounded-xl sm:p-6 sm:mb-8">
          <h3 className="mb-3 text-base font-semibold text-gray-800 sm:text-lg sm:mb-4">Filter Projects</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 text-sm transition-colors border border-gray-200 rounded-lg pl-9 sm:pl-10 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <ListFilter className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:w-5 sm:h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 text-sm transition-colors border border-gray-200 rounded-lg appearance-none pl-9 sm:pl-10 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="ASSINGED">Assigned</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="BREAK">In Break</option>
                <option value="ON HOLD">On Hold</option>
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2 sm:w-5 sm:h-5" />
            </div>

            <div className="relative">
              <Building2 className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:w-5 sm:h-5" />
              <select
                value={fabricatorFilter}
                onChange={(e) => setFabricatorFilter(e.target.value)}
                className="w-full p-2 text-sm transition-colors border border-gray-200 rounded-lg appearance-none pl-9 sm:pl-10 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Fabricators</option>
                {Array.from(new Set(projectData?.map((p) => p.fabricator?.fabName))).map((fabricator) => (
                  <option key={fabricator} value={fabricator}>
                    {fabricator}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2 sm:w-5 sm:h-5" />
            </div>

            <div className="relative">
              <ArrowUpDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:w-5 sm:h-5" />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full p-2 text-sm transition-colors border border-gray-200 rounded-lg appearance-none pl-9 sm:pl-10 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
                <option value="fabricator">Sort by Fabricator</option>
                <option value="startDate">Sort by Start Date</option>
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="flex flex-col justify-between gap-2 p-4 border-b border-gray-100 sm:p-6 sm:flex-row sm:items-center">
            <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Project List</h3>
            <div className="text-xs text-gray-500 sm:text-sm">{filteredProjects.length} projects found</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sm:px-6 sm:py-4">
                    S.no
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sm:px-6 sm:py-4">
                    Project Name
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sm:px-6 sm:py-4">
                    Fabricator
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sm:px-6 sm:py-4">
                    Submission Date
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sm:px-6 sm:py-4">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sm:px-6 sm:py-4">
                    Tasks
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sm:px-6 sm:py-4">
                    Progress
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sm:px-6 sm:py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProjects.map((project, index) => {
                  const projectTasks = taskData?.filter((task) => task?.project?.id === project?.id)
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
                  } else if (project.status === "ON HOLD") {
                    StatusIcon = PauseCircle
                    statusColor = "text-amber-500"
                    statusBgColor = "bg-amber-50"
                  } else if (project.status === "BREAK") {
                    StatusIcon = AlertCircle
                    statusColor = "text-red-500"
                    statusBgColor = "bg-red-50"
                  }

                  return (
                    <tr key={project.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="text-xs font-medium text-gray-900 sm:text-sm">{index + 1}</div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="text-xs font-medium text-gray-900 sm:text-sm">{project.name}</div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building2 className="w-3 h-3 mr-1 text-gray-400 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="text-xs text-gray-700 sm:text-sm">{project.fabricator?.fabName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="text-xs text-gray-700 sm:text-sm">{project?.endDate}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <span
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${statusBgColor} ${statusColor}`}
                        >
                          <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="text-xs font-medium text-gray-700 sm:text-sm">{projectTasks.length}</div>
                        <div className="text-xs text-gray-500">{completedTasksCount} completed</div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
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
                        <span className="inline-block mt-1 text-xs text-gray-500">{progress}% complete</span>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
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
            <div className="py-8 text-center sm:py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-gray-100 rounded-full sm:w-16 sm:h-16 sm:mb-4">
                <Search className="w-6 h-6 text-gray-400 sm:w-8 sm:h-8" />
              </div>
              <h3 className="mb-1 text-base font-medium text-gray-900 sm:text-lg">No projects found</h3>
              <p className="text-xs text-gray-500 sm:text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
      {selectedProject && (
        <ProjectStatus
          projectId={selectedProject}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          className="max-w-full mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        />
      )}
    </div>
  )
}

export default ProjectDashboard

