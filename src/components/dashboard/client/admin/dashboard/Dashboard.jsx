/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client"

import { useState, useEffect } from "react"
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
  X,
  Clock,
  Users,
  MapPin,
  FileText,
} from "lucide-react"
import { useSelector } from "react-redux";
export default function ProjectDashboard() {
  const projectData = useSelector((state) => state?.projectData.projectData);
  const taskData = useSelector((state) => state.taskData.taskData)

  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [fabricatorFilter, setFabricatorFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [activeChart, setActiveChart] = useState("bar")
  const [viewMode, setViewMode] = useState("grid")

  // Prepare project data with associated tasks
  const projectsWithTasks = projectData.map((project) => ({
    ...project,
    tasks: taskData.filter((task) => task.project_id === project.id),
  }))

  useEffect(() => {
    let filtered = [...projectData]

    // Apply filters
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    if (fabricatorFilter !== "all") {
      filtered = filtered.filter((project) => project.fabricator?.fabName === fabricatorFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
  const completedTasks = projectsWithTasks.filter((task) => task.status === "COMPLETE").length || 0
  const inProgressTasks = projectsWithTasks.filter((task) => task.status === "IN_PROGRESS").length || 0
  const assignedTask = projectsWithTasks.filter((task) => task.status === "ASSIGNED").length || 0
  const inReviewTask = projectsWithTasks.filter((task) => task.status === "IN_REVIEW").length || 0

  // Get unique fabricators for filter
  const fabricators = Array.from(new Set(projectData.map((p) => p.fabricator?.fabName).filter(Boolean)))

  // Get summary stats
  const totalProjects = projectData.length
  const activeProjects = projectData.filter((p) => p.status === "ACTIVE").length
  const totalTasks = taskData.length
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  const handleViewClick = (projectId) => {
    const project = projectData.find((p) => p.id === projectId)
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      ACTIVE: { color: "bg-blue-100 text-blue-800", icon: <Loader2 className="w-4 h-4 mr-1" /> },
      IN_PROGRESS: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="w-4 h-4 mr-1" /> },
      COMPLETE: { color: "bg-green-100 text-green-800", icon: <CheckCircle2 className="w-4 h-4 mr-1" /> },
      ASSIGNED: { color: "bg-purple-100 text-purple-800", icon: <Users className="w-4 h-4 mr-1" /> },
      IN_REVIEW: { color: "bg-orange-100 text-orange-800", icon: <AlertCircle className="w-4 h-4 mr-1" /> },
      ON_HOLD: { color: "bg-red-100 text-red-800", icon: <PauseCircle className="w-4 h-4 mr-1" /> },
    }

    const config = statusConfig[status] || { color: "bg-gray-100 text-gray-800", icon: null }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {status.replace("_", " ")}
      </span>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{totalProjects}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Active Projects</p>
                <p className="text-sm font-medium text-blue-600">{activeProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed Tasks</p>
                <p className="text-2xl font-semibold text-gray-900">{completedTasks}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-sm font-medium text-green-600">{completionRate}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${completionRate}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Loader2 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-semibold text-gray-900">{inProgressTasks}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Assigned Tasks</p>
                <p className="text-sm font-medium text-yellow-600">{assignedTask}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Team Members</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Active on Projects</p>
                <p className="text-sm font-medium text-purple-600">9</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Project Analytics</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveChart("bar")}
                  className={`p-2 rounded-md ${activeChart === "bar" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveChart("pie")}
                  className={`p-2 rounded-md ${activeChart === "pie" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <PieChart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveChart("line")}
                  className={`p-2 rounded-md ${activeChart === "line" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <LineChart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            {activeChart === "bar" && (
              <div className="h-80 flex items-center justify-center">
                <div className="w-full h-full flex flex-col">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-500">Task Distribution by Contractor</div>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-500">Completed</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-500">In Progress</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-500">Assigned</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between pr-2 text-xs text-gray-500">
                      {fabricators.map((fab, index) => (
                        <div key={index} className="h-8 flex items-center">
                          {fab.length > 15 ? `${fab.substring(0, 15)}...` : fab}
                        </div>
                      ))}
                    </div>
                    {/* Chart bars */}
                    <div className="flex-1 flex flex-col justify-between">
                      {fabricators.map((fab, index) => {
                        const fabProjects = projectData.filter((p) => p.fabricator?.fabName === fab)
                        const fabProjectIds = fabProjects.map((p) => p.id)
                        const completed = taskData.filter(
                          (t) => fabProjectIds.includes(t.project_id) && t.status === "COMPLETE",
                        ).length
                        const inProgress = taskData.filter(
                          (t) => fabProjectIds.includes(t.project_id) && t.status === "IN_PROGRESS",
                        ).length
                        const assigned = taskData.filter(
                          (t) => fabProjectIds.includes(t.project_id) && t.status === "ASSIGNED",
                        ).length
                        const total = completed + inProgress + assigned

                        return (
                          <div key={index} className="h-8 flex items-center">
                            <div className="flex h-6 w-full">
                              {completed > 0 && (
                                <div
                                  className="bg-green-500 h-full rounded-l-sm"
                                  style={{ width: `${(completed / total) * 100}%` }}
                                  title={`Completed: ${completed}`}
                                ></div>
                              )}
                              {inProgress > 0 && (
                                <div
                                  className="bg-blue-500 h-full"
                                  style={{ width: `${(inProgress / total) * 100}%` }}
                                  title={`In Progress: ${inProgress}`}
                                ></div>
                              )}
                              {assigned > 0 && (
                                <div
                                  className="bg-purple-500 h-full rounded-r-sm"
                                  style={{ width: `${(assigned / total) * 100}%` }}
                                  title={`Assigned: ${assigned}`}
                                ></div>
                              )}
                            </div>
                            <div className="ml-2 text-xs text-gray-500">{total}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeChart === "pie" && (
              <div className="h-80 flex items-center justify-center">
                <div className="w-64 h-64 relative rounded-full overflow-hidden">
                  {/* Simple CSS-based pie chart */}
                  <div
                    className="absolute bg-green-500"
                    style={{
                      width: "100%",
                      height: "100%",
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((completedTasks / totalTasks) * Math.PI * 2)}% ${50 - 50 * Math.sin((completedTasks / totalTasks) * Math.PI * 2)}%, 50% 50%)`,
                    }}
                  ></div>
                  <div
                    className="absolute bg-blue-500"
                    style={{
                      width: "100%",
                      height: "100%",
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((completedTasks / totalTasks) * Math.PI * 2)}% ${50 - 50 * Math.sin((completedTasks / totalTasks) * Math.PI * 2)}%, ${50 + 50 * Math.cos(((completedTasks + inProgressTasks) / totalTasks) * Math.PI * 2)}% ${50 - 50 * Math.sin(((completedTasks + inProgressTasks) / totalTasks) * Math.PI * 2)}%, 50% 50%)`,
                    }}
                  ></div>
                  <div
                    className="absolute bg-purple-500"
                    style={{
                      width: "100%",
                      height: "100%",
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((completedTasks + inProgressTasks) / totalTasks) * Math.PI * 2)}% ${50 - 50 * Math.sin(((completedTasks + inProgressTasks) / totalTasks) * Math.PI * 2)}%, ${50 + 50 * Math.cos(((completedTasks + inProgressTasks + assignedTask) / totalTasks) * Math.PI * 2)}% ${50 - 50 * Math.sin(((completedTasks + inProgressTasks + assignedTask) / totalTasks) * Math.PI * 2)}%, 50% 50%)`,
                    }}
                  ></div>
                  <div
                    className="absolute bg-orange-500"
                    style={{
                      width: "100%",
                      height: "100%",
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((completedTasks + inProgressTasks + assignedTask) / totalTasks) * Math.PI * 2)}% ${50 - 50 * Math.sin(((completedTasks + inProgressTasks + assignedTask) / totalTasks) * Math.PI * 2)}%, 100% 50%, 50% 50%)`,
                    }}
                  ></div>
                </div>
                <div className="ml-8">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Task Status Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Completed ({completedTasks})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">In Progress ({inProgressTasks})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Assigned ({assignedTask})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">In Review ({inReviewTask})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeChart === "line" && (
              <div className="h-80 flex items-center justify-center">
                <div className="w-full h-full">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-500">Project Completion Progress</div>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-500">Completion %</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-64">
                    {/* Y-axis */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between">
                      <span className="text-xs text-gray-500">100%</span>
                      <span className="text-xs text-gray-500">75%</span>
                      <span className="text-xs text-gray-500">50%</span>
                      <span className="text-xs text-gray-500">25%</span>
                      <span className="text-xs text-gray-500">0%</span>
                    </div>

                    {/* Grid lines */}
                    <div className="absolute left-8 right-0 top-0 bottom-0">
                      <div className="border-b border-gray-200 h-1/4"></div>
                      <div className="border-b border-gray-200 h-1/4"></div>
                      <div className="border-b border-gray-200 h-1/4"></div>
                      <div className="border-b border-gray-200 h-1/4"></div>
                    </div>

                    {/* Line chart */}
                    <div className="absolute left-8 right-0 top-0 bottom-0 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                        <polyline
                          points={projectData
                            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                            .map((project, index) => {
                              const x = (index / (projectData.length - 1)) * 500
                              const y = 200 - (project.completion / 100) * 200
                              return `${x},${y}`
                            })
                            .join(" ")}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                        />
                        {projectData
                          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                          .map((project, index) => {
                            const x = (index / (projectData.length - 1)) * 500
                            const y = 200 - (project.completion / 100) * 200
                            return (
                              <circle key={index} cx={x} cy={y} r="4" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                            )
                          })}
                      </svg>
                    </div>

                    {/* X-axis labels */}
                    <div className="absolute left-8 right-0 bottom-0 flex justify-between mt-2">
                      {projectData
                        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                        .map((project, index) => (
                          <div key={index} className="text-xs text-gray-500 transform -rotate-45 origin-top-left">
                            {project.name.length > 10 ? `${project.name.substring(0, 10)}...` : project.name}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">Projects</h2>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <select
                      className="pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="ACTIVE">Active</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETE">Complete</option>
                      <option value="ASSIGNED">Assigned</option>
                      <option value="IN_REVIEW">In Review</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      className="pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={fabricatorFilter}
                      onChange={(e) => setFabricatorFilter(e.target.value)}
                    >
                      <option value="all">All Contractors</option>
                      {fabricators.map((fab, index) => (
                        <option key={index} value={fab}>
                          {fab}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    className={`p-2 rounded-md ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
                    onClick={() => setViewMode("list")}
                  >
                    <ListFilter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project List */}
          <div className="p-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No projects found matching your criteria.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => {
                  const projectTasks = taskData.filter((task) => task.project_id === project.id)
                  const completedTaskCount = projectTasks.filter((task) => task.status === "COMPLETE").length
                  const totalTaskCount = projectTasks.length
                  const completionPercentage =
                    totalTaskCount > 0 ? Math.round((completedTaskCount / totalTaskCount) * 100) : 0

                  return (
                    <div key={project.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{project.name}</h3>
                          <StatusBadge status={project.status} />
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{project.description}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <MapPin className="w-4 h-4 mr-1" />
                          {project.location}
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Progress</span>
                            <span>{completionPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${completionPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                          <div>
                            <span className="font-medium">Budget:</span>
                            <span className="ml-1">${project.budget?.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="font-medium">Tasks:</span>
                            <span className="ml-1">
                              {completedTaskCount}/{totalTaskCount}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div>
                            <span className="font-medium">Start:</span>
                            <span className="ml-1">{new Date(project.startDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="font-medium">End:</span>
                            <span className="ml-1">{new Date(project.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-3 flex justify-between">
                        <div className="text-sm text-gray-500">
                          <Building2 className="w-4 h-4 inline mr-1" />
                          {project.fabricator.fabName}
                        </div>
                        <button
                          onClick={() => handleViewClick(project.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortField === "name") {
                            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                          } else {
                            setSortField("name")
                            setSortDirection("asc")
                          }
                        }}
                      >
                        <div className="flex items-center">
                          Project Name
                          {sortField === "name" && <ArrowUpDown className="w-4 h-4 ml-1" />}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          if (sortField === "fabricator") {
                            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                          } else {
                            setSortField("fabricator")
                            setSortDirection("asc")
                          }
                        }}
                      >
                        <div className="flex items-center">
                          Contractor
                          {sortField === "fabricator" && <ArrowUpDown className="w-4 h-4 ml-1" />}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Progress
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Timeline
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Budget
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProjects.map((project) => {
                      const projectTasks = taskData.filter((task) => task.project_id === project.id)
                      const completedTaskCount = projectTasks.filter((task) => task.status === "COMPLETE").length
                      const totalTaskCount = projectTasks.length
                      const completionPercentage =
                        totalTaskCount > 0 ? Math.round((completedTaskCount / totalTaskCount) * 100) : 0

                      return (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{project.name}</div>
                            <div className="text-sm text-gray-500">{project.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={project.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{project.fabricator.fabName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${completionPercentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-500">{completionPercentage}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(project.startDate).toLocaleDateString()} -{" "}
                            {new Date(project.endDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${project.budget?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleViewClick(project.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Project Detail Modal */}
      {/* {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">{selectedProject.name}</h3>
              <button onClick={handleModalClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Project Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-4">
                      <StatusBadge status={selectedProject.status} />
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{selectedProject.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium">{selectedProject.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contractor</p>
                        <p className="text-sm font-medium">{selectedProject.fabricator.fabName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="text-sm font-medium">
                          {new Date(selectedProject.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="text-sm font-medium">{new Date(selectedProject.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="text-sm font-medium">${selectedProject.budget?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Completion</p>
                        <p className="text-sm font-medium">{selectedProject.completion}%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Project Progress</h4>
                  <div className="bg-gray-50 rounded-lg p-4 h-full">
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{selectedProject.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${selectedProject.completion}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Planning</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Design</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Foundation</span>
                          <span>{selectedProject.completion >= 50 ? "100" : selectedProject.completion * 2}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{
                              width: selectedProject.completion >= 50 ? "100%" : `${selectedProject.completion * 2}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Structure</span>
                          <span>
                            {selectedProject.completion >= 70
                              ? Math.round((selectedProject.completion - 40) * 1.5)
                              : "0"}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{
                              width:
                                selectedProject.completion >= 70
                                  ? `${Math.round((selectedProject.completion - 40) * 1.5)}%`
                                  : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Finishing</span>
                          <span>
                            {selectedProject.completion >= 90 ? Math.round((selectedProject.completion - 80) * 5) : "0"}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{
                              width:
                                selectedProject.completion >= 90
                                  ? `${Math.round((selectedProject.completion - 80) * 5)}%`
                                  : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Tasks</h4>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Task Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Assignee
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {taskData
                        .filter((task) => task.project_id === selectedProject.id)
                        .map((task) => (
                          <tr key={task.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {task.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={task.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}
