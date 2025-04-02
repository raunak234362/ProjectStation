/* eslint-disable react/no-unescaped-entities */
"use client"

import { useSelector } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // Get data from Redux store
  const RFI = useSelector((state) => state?.projectData?.rfiData || [])
  const projects = useSelector((state) => state?.projectData?.projectData || [])
  const submittals = useSelector((state) => state?.projectData?.submittalsData || [])
  const changeOrders = useSelector((state) => state?.projectData?.changeOrdersData || [])
  const quotations = useSelector((state) => state?.projectData?.quotationsData || [])

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate project statistics
  const completedProjects = projects.filter(
    (project) => project?.status === "Completed" || project?.status === "completed",
  ).length

  const activeProjects = projects.filter(
    (project) => project?.status === "ACTIVE" || project?.status === "active",
  ).length

  const pendingRFIs = RFI.filter((rfi) => rfi?.status === "Open" || rfi?.status === "Pending").length

  const pendingSubmittals = submittals?.filter(
    (submittal) => submittal?.status === "Pending" || submittal?.status === "Under Review",
  ).length

  const pendingChangeOrders = changeOrders?.filter(
    (order) => order?.status === "Pending" || order?.status === "Under Review",
  ).length

  // Get recent projects (last 3)
  const recentProjects = [...(projects || [])]
    .sort((a, b) => {
      return new Date(b.created_at || b.createdAt || Date.now()) - new Date(a.created_at || a.createdAt || Date.now())
    })
    .slice(0, 3)

  return (
    <div className="w-full min-h-screen bg-gray-50 my-4 rounded-lg">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-6 shadow-lg rounded-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Client Dashboard</h1>
          <p className="text-green-100">Welcome back! Here's an overview of your projects and requests.</p>

          {/* Dashboard Tabs */}
          <div className="flex mt-6 space-x-1 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "overview" ? "bg-white text-green-700" : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "projects" ? "bg-white text-green-700" : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("rfi")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "rfi" ? "bg-white text-green-700" : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              RFI
            </button>
            <button
              onClick={() => setActiveTab("submittals")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "submittals" ? "bg-white text-green-700" : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              Submittals
            </button>
            <button
              onClick={() => setActiveTab("changeOrders")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "changeOrders" ? "bg-white text-green-700" : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              Change Orders
            </button>
            <button
              onClick={() => setActiveTab("quotations")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "quotations" ? "bg-white text-green-700" : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              Quotations
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-blue-500 transform transition-transform hover:scale-105">
                <div className="p-4">
                  <p className="text-gray-500 text-sm">Total Projects</p>
                  <h2 className="text-2xl font-bold text-gray-800">{projects.length}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-green-500 transform transition-transform hover:scale-105">
                <div className="p-4">
                  <p className="text-gray-500 text-sm">Completed</p>
                  <h2 className="text-2xl font-bold text-gray-800">{completedProjects}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-yellow-500 transform transition-transform hover:scale-105">
                <div className="p-4">
                  <p className="text-gray-500 text-sm">Active</p>
                  <h2 className="text-2xl font-bold text-gray-800">{activeProjects}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-purple-500 transform transition-transform hover:scale-105">
                <div className="p-4">
                  <p className="text-gray-500 text-sm">Pending RFIs</p>
                  <h2 className="text-2xl font-bold text-gray-800">{pendingRFIs}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-indigo-500 transform transition-transform hover:scale-105">
                <div className="p-4">
                  <p className="text-gray-500 text-sm">Pending Submittals</p>
                  <h2 className="text-2xl font-bold text-gray-800">{pendingSubmittals}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-red-500 transform transition-transform hover:scale-105">
                <div className="p-4">
                  <p className="text-gray-500 text-sm">Pending Changes</p>
                  <h2 className="text-2xl font-bold text-gray-800">{pendingChangeOrders}</h2>
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Projects</h3>
                </div>
                <div className="p-4">
                  {recentProjects.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No projects found</p>
                  ) : (
                    <div className="space-y-4">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          {console.log(project)}
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{project.name}</h4>
                              <p className="text-sm text-gray-500 mt-1">Start: {formatDate(project.start_date)}</p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                project.status === "COMPLETED" || project.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : project.status === "ACTIVE" || project.status === "active"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {project.status || "N/A"}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${project.progress || 0}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-500">Progress</span>
                              <span className="text-xs font-medium">{project.progress || 0}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent RFIs */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Recent RFIs</h3>
                </div>
                <div className="p-4">
                  {RFI.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No RFIs found</p>
                  ) : (
                    <div className="space-y-4">
                      {RFI.slice(0, 3).map((rfi) => (
                        <div key={rfi.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {rfi.fabricator?.project?.name || "Unknown Project"}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">{rfi.remarks || "No remarks"}</p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                rfi.status === "Closed" || rfi.status === "closed"
                                  ? "bg-green-100 text-green-800"
                                  : rfi.status === "Open" || rfi.status === "open"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {rfi.status || "Open"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Date: {formatDate(rfi.date)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-lg shadow-md mb-8">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Action Items</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">Pending Approvals</h4>
                    <p className="text-sm text-gray-600 mb-3">You have items waiting for your approval</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>RFIs</span>
                        <span className="font-medium">{pendingRFIs}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Submittals</span>
                        <span className="font-medium">{pendingSubmittals}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Change Orders</span>
                        <span className="font-medium">{pendingChangeOrders}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Recent Updates</h4>
                    <p className="text-sm text-gray-600 mb-3">Latest updates on your projects</p>
                    <ul className="text-sm space-y-2">
                      {recentProjects.slice(0, 2).map((project) => (
                        <li key={project.id} className="flex justify-between">
                          <span className="truncate">{project.name}</span>
                          <span className="text-blue-600 font-medium">Updated</span>
                        </li>
                      ))}
                      {RFI.slice(0, 1).map((rfi) => (
                        <li key={rfi.id} className="flex justify-between">
                          <span className="truncate">New RFI</span>
                          <span className="text-blue-600 font-medium">Added</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Quick Actions</h4>
                    <p className="text-sm text-gray-600 mb-3">Common tasks you might want to do</p>
                    <div className="space-y-2 w-full flex flex-col text-center">
                      <Link to="/client/rfq/add-rfq" className="w-full bg-white border border-green-600 text-green-600 hover:bg-green-50 py-2 px-3 rounded-md text-sm transition-colors">
                        Create New RFQ
                      </Link>
                      <Link className="w-full bg-white border border-green-600 text-green-600 hover:bg-green-50 py-2 px-3 rounded-md text-sm transition-colors">
                        Submit Document
                      </Link>
                      <Link className="w-full bg-white border border-green-600 text-green-600 hover:bg-green-50 py-2 px-3 rounded-md text-sm transition-colors">
                        Request Change
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Projects Tab Content */}
        {activeTab === "projects" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">All Projects</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No projects found
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          <div className="text-xs text-gray-500">{project.code || "No code"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              project.status === "Completed" || project.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : project.status === "In Progress" || project.status === "in progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {project.status || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(project.start_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(project.end_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${project.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{project.progress || 0}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                          <button className="text-blue-600 hover:text-blue-900">Details</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RFI Tab Content */}
        {activeTab === "rfi" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Requests for Information (RFI)</h3>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                New RFI
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject/Remarks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {RFI.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No RFIs found
                      </td>
                    </tr>
                  ) : (
                    RFI.map((rfi) => (
                      <tr key={rfi.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {rfi.fabricator?.project?.name || "Unknown Project"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{rfi.remarks || "No remarks"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(rfi.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              rfi.status === "Closed" || rfi.status === "closed"
                                ? "bg-green-100 text-green-800"
                                : rfi.status === "Open" || rfi.status === "open"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {rfi.status || "Open"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded mr-2">
                            View
                          </button>
                          <button className="bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded">
                            Forward
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Submittals Tab Content */}
        {activeTab === "submittals" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Submittals</h3>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                New Submittal
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submittals?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No submittals found
                      </td>
                    </tr>
                  ) : (
                    submittals?.map((submittal) => (
                      <tr key={submittal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {submittal.project?.name || "Unknown Project"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{submittal.title || "No title"}</div>
                          <div className="text-xs text-gray-500">
                            {submittal.description?.substring(0, 50) || "No description"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(submittal.submission_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              submittal.status === "Approved" || submittal.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : submittal.status === "Rejected" || submittal.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : submittal.status === "Pending" || submittal.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {submittal.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded mr-2">
                            View
                          </button>
                          <button className="bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Change Orders Tab Content */}
        {activeTab === "changeOrders" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Change Orders</h3>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                Request Change
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change Order #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {changeOrders?.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No change orders found
                      </td>
                    </tr>
                  ) : (
                    changeOrders?.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.project?.name || "Unknown Project"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.order_number || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.description?.substring(0, 50) || "No description"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${order.amount?.toLocaleString() || "0"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === "Approved" || order.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Rejected" || order.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : order.status === "Pending" || order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded mr-2">
                            View
                          </button>
                          <button className="bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quotations Tab Content */}
        {activeTab === "quotations" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Quotations</h3>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                Request Quote
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quote #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotations?.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No quotations found
                      </td>
                    </tr>
                  ) : (
                    quotations?.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{quote.quote_number || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{quote.project?.name || "Unknown Project"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {quote.description?.substring(0, 50) || "No description"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(quote.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${quote.amount?.toLocaleString() || "0"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              quote.status === "Accepted" || quote.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : quote.status === "Rejected" || quote.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : quote.status === "Pending" || quote.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {quote.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded mr-2">
                            View
                          </button>
                          <button className="bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

