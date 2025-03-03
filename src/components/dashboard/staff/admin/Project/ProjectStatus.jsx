/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client"

import { useSelector } from "react-redux"
import { Users, AlertCircle, X, Calendar, BarChart2, PieChart } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts"
import { useMemo, useState } from "react"

const ProjectStatus = ({ projectId, onClose }) => {
  const [selectedView, setSelectedView] = useState("all")
  const [hoveredTask, setHoveredTask] = useState(null)

  const projectData = useSelector((state) => state?.projectData.projectData.find((project) => project.id === projectId))
  const taskData = useSelector((state) => state.taskData.taskData)
  const userData = useSelector((state) => state.userData.staffData)

  const projectTasks = useMemo(() => taskData.filter((task) => task.project_id === projectId), [taskData, projectId])

  const parseDuration = (duration) => {
    if (!duration || typeof duration !== "string") return 0
    const [h, m, s] = duration.split(":").map(Number)
    return h + m / 60 + s / 3600
  }

  const calculateHours = (type) => {
    const tasks = projectTasks.filter((task) => task.name.startsWith(type))
    return {
      assigned: tasks.reduce((sum, task) => sum + parseDuration(task.duration), 0),
      taken: tasks.reduce(
        (sum, task) =>
          sum + (task?.workingHourTask?.reduce((innerSum, innerTask) => innerSum + innerTask.duration, 0) || 0),
        0,
      ),
    }
  }

  const taskTypes = {
    MODELING: calculateHours("MODELING"),
    MODEL_CHECKING: calculateHours("MODEL_CHECKING"),
    DETAILING: calculateHours("DETAILING"),
    DETAIL_CHECKING: calculateHours("DETAIL_CHECKING"),
    ERECTION: calculateHours("ERECTION"),
    ERECTION_CHECKING: calculateHours("ERECTION_CHECKING"),
  }

  const totalAssignedHours = Object.values(taskTypes).reduce((sum, type) => sum + type?.assigned, 0)

  const formatHours = (hours) => {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return `${h}h ${m}m`
  }

  const formatMinutesToHours = (minutes) => {
    if (!minutes) return "0h 0m"
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
  }

  const userContributions = userData
    .map((user) => {
      const userTasks = projectTasks?.filter((task) => task.user?.id === user.id)
      return {
        name: user.f_name,
        taskCount: userTasks.length,
      }
    })
    .filter((user) => user.taskCount > 0)
    .sort((a, b) => b.taskCount - a.taskCount)

  // Prepare data for Gantt chart
  const ganttData = projectTasks.map((task) => {
    const startDate = new Date(task.start_date)
    const endDate = new Date(task.due_date)
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    const type = task.name.split(" ")[0] // Assuming first word is the type

    // Extract assigned and taken hours
    const assignedHours = parseDuration(task.duration)
    const takenHours = task?.workingHourTask?.reduce((sum, innerTask) => sum + innerTask.duration, 0) || 0

    // Calculate progress percentage
    let progress = assignedHours ? Math.min((takenHours / assignedHours) * 100, 100) : 0

    // Override progress based on status
    if (task.status === "IN REVIEW") {
      progress = 80
    } else if (task.status === "COMPLETED") {
      progress = 100
    } else if (task.status === "IN PROGRESS") {
      progress = Math.min(progress, 80)
    }

    // Ensure progress does not exceed 80% when in progress
    if (task.status === "IN PROGRESS" && progress > 80) {
      progress = 80
    }

    return {
      id: task.id,
      name: task.name,
      username: `${task.user?.f_name} ${task.user?.l_name}`,
      type,
      startDate,
      endDate,
      duration,
      progress: Math.round(progress), // Ensure it's rounded
      status: task.status,
    }
  })

  const timelineWidth = 1000
  const rowHeight = 40
  const today = new Date()

  // Find the earliest and latest dates
  const dates = ganttData.reduce((acc, task) => {
    acc.push(task.startDate, task.endDate)
    return acc
  }, [])
  const minDate = new Date(Math.min(...dates))
  const maxDate = new Date(Math.max(...dates))
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24))

  // Format date to display in a more readable way
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Enhanced getPositionAndWidth to handle date calculations
  const getPositionAndWidth = (start, end) => {
    const left = ((start - minDate) / (1000 * 60 * 60 * 24)) * (timelineWidth / totalDays)
    const width = Math.max(((end - start) / (1000 * 60 * 60 * 24)) * (timelineWidth / totalDays), 30) // Minimum width of 30px for better visibility
    return { left, width }
  }

  // Calculate month divisions for the timeline header
  const getMonthDivisions = () => {
    const months = []
    const currentDate = new Date(minDate)

    while (currentDate <= maxDate) {
      const monthStart = new Date(currentDate)
      currentDate.setMonth(currentDate.getMonth() + 1)
      const monthEnd = new Date(Math.min(currentDate.getTime(), maxDate.getTime()))

      const { left } = getPositionAndWidth(monthStart, monthStart)
      const { width } = getPositionAndWidth(monthStart, monthEnd)

      months.push({
        label: monthStart.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        left,
        width,
      })
    }
    return months
  }

  const monthDivisions = getMonthDivisions()

  const groupedTasks = ganttData.reduce((acc, task) => {
    if (!acc[task.type]) acc[task.type] = []
    acc[task.type].push(task)
    return acc
  }, {})

  const typeColors = {
    MODELING: "#3b82f6", // blue-500
    MODEL_CHECKING: "#1d4ed8", // blue-700
    DETAILING: "#22c55e", // green-500
    DETAIL_CHECKING: "#15803d", // green-700
    ERECTION: "#a855f7", // purple-500
    ERECTION_CHECKING: "#7e22ce", // purple-700
  }

  // Status colors
  const statusColors = {
    "IN PROGRESS": "#fbbf24", // amber-400
    "IN REVIEW": "#60a5fa", // blue-400
    COMPLETED: "#34d399", // emerald-400
    "NOT STARTED": "#d1d5db", // gray-300
  }

  // Prepare data for pie chart
  const statusData = Object.entries(
    projectTasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {}),
  ).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  // Prepare data for task type breakdown
  const taskTypeData = Object.entries(taskTypes).map(([type, hours]) => ({
    name: type,
    assigned: hours.assigned,
    taken: hours.taken / 60, // Convert minutes to hours for comparison
  }))

  // COLORS for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-50">
      <div className="bg-white h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg w-11/12 md:w-10/12">
        {/* Header with improved styling */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-5 py-3 text-xl font-bold rounded-lg shadow-md">
              {projectData?.name || "Unknown Project"}
            </div>
            <span className="text-gray-500 text-sm">
              {formatDate(minDate)} - {formatDate(maxDate)}
            </span>
          </div>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Project Overview Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 shadow-sm border border-blue-100">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4 text-blue-800">
              <AlertCircle className="h-5 w-5" /> Project Overview
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Tasks:</span>
                <span className="font-semibold text-lg">{projectTasks.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed:</span>
                <span className="font-semibold text-lg text-green-600">
                  {projectTasks.filter((task) => task.status === "COMPLETED").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">In Progress:</span>
                <span className="font-semibold text-lg text-amber-500">
                  {projectTasks.filter((task) => task.status === "IN PROGRESS").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">In Review:</span>
                <span className="font-semibold text-lg text-blue-500">
                  {projectTasks.filter((task) => task.status === "IN REVIEW").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Not Started:</span>
                <span className="font-semibold text-lg text-gray-500">
                  {projectTasks.filter((task) => task.status === "NOT STARTED").length}
                </span>
              </div>
            </div>
          </div>

          {/* Status Distribution Pie Chart */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <PieChart className="h-5 w-5" /> Task Status Distribution
            </h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} tasks`, "Count"]} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Task Type Hours Comparison */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <BarChart2 className="h-5 w-5" /> Hours by Task Type
            </h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value.toFixed(2)} hours`, ""]} labelStyle={{ color: "black" }} />
                  <Legend />
                  <Bar dataKey="assigned" name="Assigned Hours" fill="#8884d8" />
                  <Bar dataKey="taken" name="Hours Taken" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Contributions Chart with improved styling */}
        <div className="bg-white rounded-xl p-5 shadow-sm border mb-6">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
            <Users className="h-5 w-5" /> Team Contributions
          </h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userContributions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "Tasks",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip
                  formatter={(value) => [`${value} tasks`, "Task Count"]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                />
                <Bar dataKey="taskCount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gantt Chart with improved styling */}
        <div className="bg-white rounded-xl p-5 shadow-sm border mb-6">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
            <Calendar className="h-5 w-5" /> Project Timeline
          </h2>

          {/* Timeline view selector */}
          <div className="flex mb-4 gap-2">
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedView === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedView("all")}
            >
              All Tasks
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedView === "week" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedView("week")}
            >
              This Week
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedView === "month" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedView("month")}
            >
              This Month
            </button>
          </div>

          {/* Task type legend */}
          <div className="flex flex-wrap gap-3 mb-4">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
                <span className="text-xs text-gray-600">{type}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto w-full">
            <div style={{ width: `${timelineWidth + 300}px` }} className="relative">
              {/* Timeline Header */}
              <div className="flex border-b sticky top-0 bg-white z-10">
                <div className="w-52 flex-shrink-0 font-bold p-2 bg-gray-50">Task Name</div>
                <div className="flex-1 relative">
                  {/* Month divisions */}
                  <div className="h-8 border-b bg-gray-50">
                    {monthDivisions.map((month, i) => (
                      <div
                        key={i}
                        className="absolute border-l border-gray-300 h-full flex items-center px-2"
                        style={{ left: `${month.left}px` }}
                      >
                        <span className="text-xs font-medium text-gray-600">{month.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Date Axis */}
                  <div className="absolute left-0 right-0 border-b">
                    {Array.from({ length: totalDays + 1 }).map((_, i) => {
                      const date = new Date(minDate)
                      date.setDate(date.getDate() + i)
                      const isToday = date.toDateString() === today.toDateString()

                      return (
                        <div
                          key={i}
                          className={`absolute border-l ${isToday ? "border-red-500" : "border-gray-200"} text-xs text-center`}
                          style={{
                            left: `${(i * timelineWidth) / totalDays}px`,
                            width: `${timelineWidth / totalDays}px`,
                            height: "20px",
                          }}
                        >
                          {i % 2 === 0 && (
                            <span className={`text-xs ${isToday ? "text-red-500 font-bold" : "text-gray-500"}`}>
                              {date.getDate()}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Today indicator */}
              {minDate <= today && today <= maxDate && (
                <div
                  className="absolute top-8 bottom-0 border-l-2 border-red-500 z-20"
                  style={{
                    left: `${((today - minDate) / (1000 * 60 * 60 * 24)) * (timelineWidth / totalDays) + 52}px`,
                  }}
                >
                  <div className="bg-red-500 text-white text-xs px-1 py-0.5 rounded-sm whitespace-nowrap transform -translate-x-1/2">
                    Today
                  </div>
                </div>
              )}

              {/* Render grouped tasks */}
              {Object.keys(groupedTasks).map((type) => (
                <div key={type} className="mt-4 w-full">
                  <div
                    className="text-lg font-semibold p-2 bg-gray-50 rounded-t-md border-b-2"
                    style={{ borderColor: typeColors[type] || "#ccc" }}
                  >
                    <h3>{type}</h3>
                  </div>
                  {groupedTasks[type].map((task, index) => {
                    const { left, width } = getPositionAndWidth(
                      task.startDate,
                      new Date(task.endDate.getTime() + 24 * 60 * 60 * 1000), // Add one day to end date
                    )

                    return (
                      <div
                        key={index}
                        className="flex w-full items-center border-b hover:bg-gray-50 transition-colors"
                        style={{ height: `${rowHeight}px` }}
                      >
                        <div className="w-52 flex-shrink-0 truncate px-2 font-medium">
                          {task.username || "Unassigned"}
                        </div>
                        <div className="flex-1 relative">
                          <div
                            className="absolute z-0 h-6 rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
                            style={{
                              left: `${left}px`,
                              width: `${width}px`,
                              top: "8px",
                              backgroundColor: typeColors[task.type] || "#ccc",
                            }}
                            onMouseEnter={() => setHoveredTask(task)}
                            onMouseLeave={() => setHoveredTask(null)}
                          >
                            <div className="h-full bg-white bg-opacity-30" style={{ width: `${task.progress}%` }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-medium text-white drop-shadow-sm">{task.progress}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task details tooltip */}
        {hoveredTask && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
            <div className="bg-white rounded-lg shadow-xl border p-4 max-w-md">
              <h3 className="font-bold text-lg mb-2">{hoveredTask.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Assigned to:</div>
                <div className="font-medium">{hoveredTask.username || "Unassigned"}</div>

                <div className="text-gray-600">Timeline:</div>
                <div className="font-medium">
                  {formatDate(hoveredTask.startDate)} - {formatDate(hoveredTask.endDate)}
                </div>

                <div className="text-gray-600">Duration:</div>
                <div className="font-medium">{hoveredTask.duration} days</div>

                <div className="text-gray-600">Status:</div>
                <div className="font-medium">
                  <span
                    className="inline-block px-2 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: statusColors[hoveredTask.status] || "#ccc",
                      color: hoveredTask.status === "NOT STARTED" ? "#333" : "#fff",
                    }}
                  >
                    {hoveredTask.status}
                  </span>
                </div>

                <div className="text-gray-600">Progress:</div>
                <div className="font-medium">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${hoveredTask.progress}%`,
                        backgroundColor: statusColors[hoveredTask.status] || "#ccc",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs">{hoveredTask.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectStatus

