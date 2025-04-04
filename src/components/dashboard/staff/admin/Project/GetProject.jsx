/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Service from "../../../../../config/Service";
import { Provider, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddFiles, AddWB, Button, EditProject } from "../../../../index";
import { BASE_URL } from "../../../../../config/constant";
import AllWorkBreakdown from "./wb/AllWorkBreakdown";
import ProjectStatus from "./ProjectStatus";

const GetProject = ({ projectId, onClose }) => {
  const [project, setProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEditProject, setSelectedEditProject] = useState(null);
  const [selectedProjectWB, setSelectedProjectWB] = useState(null);
  const [addWorkBreakdown, setAddWorkBreakdown] = useState(false);
  const [allWorkBreakdown, setAllWorkBreakdown] = useState(false);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [editWorkBreakdown, setEditWorkBreakdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectData = useSelector((state) =>
    state?.projectData.projectData.find((project) => project.id === projectId)
  );
  const departmentData = useSelector(
    (state) => state?.userData?.departmentData
  );
  const userData = useSelector((state) => state?.userData?.userData);
  // const fetchFiles = async (data) => {
  //   console.log("Fetching files", data);
  //   try {
  //     const files = await Service.allProjectFile(projectId,data);

  //     console.log("Files", files);
  //   } catch (error) {
  //     console.log("Error fetching files:", error);
  //   }
  // };

  // const fetchFileAndOpen = async (fileId) => {
  //   try {
  //     const response = await Service.allProjectFile(projectId, fileId, { responseType: 'blob' }); // API call to fetch the file as blob
  //     console.log("File response", response);
  //     // const fileUrl = URL.createObjectURL(response.data); // Create object URL from blob
  //     // console.log("File URL", fileUrl);
  //     window.open(response, "_blank"); // Open file in a new tab
  //   } catch (error) {
  //     console.error("Error opening file:", error);
  //   }
  // };

  const handleAddWorkBreakdown = () => {
    setAddWorkBreakdown(true);
    setSelectedProject(projectData.id);
  };

  const handleAllWorkBreakdown = () => {
    setAllWorkBreakdown(true);
    setSelectedProjectWB(projectData.id);
  };

  const handleCloseAWB = async () => {
    setAddWorkBreakdown(false);
    setSelectedProject(null);
  };

  const handleCloseAllWB = async () => {
    setAllWorkBreakdown(false);
    setSelectedProjectWB(null);
  };

  const handleClose = async () => {
    onClose(true);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
    setSelectedEditProject(projectData);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEditProject(null);
  };

 

  const handleStatusView = (projectID) => {
    setSelectedProjectStatus(projectID);
    setIsStatusModalOpen(true);
  };

  const handleStatusClose = () => {
    setSelectedProjectStatus(null);
    setIsStatusModalOpen(false);
  };

  const projectDetails = {
    projectData: projectData, // Ensure correct property assignment
    // Add other properties as needed
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-50">
      <div className="bg-white h-[80vh] p-5 md:p-5 rounded-lg shadow-lg w-11/12 md:w-6/12 ">
        <div className="flex flex-row justify-between">
          <Button onClick={handleEditClick}>Edit</Button>
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>
        <div className="h-[70vh] overflow-y-auto">
          <div className="top-2 overflow-y-auto w-full flex justify-center z-10">
            <div className="mt-2">
              <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
                Project: {projectData?.name || "Unknown"}
              </div>
            </div>
          </div>

          <div className=" h-fit overflow-y-auto rounded-lg shadow-lg">
            <div className="bg-gray-100/50 rounded-lg shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4">Project Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-x-hidden overflow-y-hidden">
                {[
                  { label: "Description", value: projectData?.description },
                  {
                    label: "Fabricator",
                    value: projectData?.fabricator?.fabName,
                  },
                  { label: "Status", value: projectData?.status },
                  {
                    label: "Estimated Hours",
                    value: projectData?.estimatedHours,
                  },
                  { label: "Stage", value: projectData?.stage },
                  { label: "Tool", value: projectData?.tools },
                  { label: "Start Date", value: projectData?.startDate },
                  { label: "Department", value: projectData?.department?.name },
                  { label: "Approval Date", value: projectData?.approvalDate },
                  { label: "End Date", value: projectData?.endDate },
                  { label: "Team Name", value: projectData?.team?.name },
                  {
                    label: "Project Manager",
                    value: `${projectData?.manager?.f_name || ''} ${projectData?.manager?.m_name || ''} ${projectData?.manager?.l_name || ''}`,
                  },
                  {
                    label: "Misc Design",
                    value: projectData?.miscDesign ? "Marked" : "Not required",
                  },
                  {
                    label: "Connection Design",
                    value: projectData?.connectionDesign
                      ? "Marked"
                      : "Not required",
                  },
                  // {
                  //   label: "Files",
                  //   value: Array.isArray(projectData?.files)
                  //     ? projectData?.files.map((file, index) => (
                  //         <Button
                  //           key={index}
                  //           onClick={() => fetchFileAndOpen(file.id)} // Open file in a new tab
                  //         >
                  //           {file.originalName || `File ${index + 1}`}
                  //         </Button>
                  //       ))
                  //     : "Not available",
                  // },
                  {
                    label: "Files",
                    value: Array.isArray(projectData?.files)
                      ? projectData?.files?.map((file, index) => (
                        <a
                          key={index}
                          href={`${import.meta.env.VITE_BASE_URL
                            }/api/project/projects/viewfile/${projectId}/${file.id
                            }`} // Use the file path with baseURL
                          target="_blank" // Open in a new tab
                          rel="noopener noreferrer"
                          className="px-5 py-2 text-teal-500 hover:underline"
                        >
                          {file.originalName || `File ${index + 1}`}
                        </a>
                      ))
                      : "Not available",
                  },
                ]?.map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="font-medium text-gray-700">{label}:</span>
                    <span className="text-gray-600">
                      {value || "Not available"}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3">
                Project Status:{" "}
                <Button onClick={() => handleStatusView(projectId)}>
                  View
                </Button>
              </p>
            </div>
            <div className="bg-gray-100/50 rounded-lg shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4">Fabricator Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-x-hidden overflow-y-hidden">
                {[
                  {
                    label: "Fabricator",
                    value: projectData?.fabricator?.fabName,
                  },
                  {
                    label: "Website",
                    value: projectData?.fabricator?.website ? (
                      <a
                        href={projectData?.fabricator?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-wrap hover:underline"
                      >
                        {projectData?.fabricator?.website}
                      </a>
                    ) : (
                      "Not available"
                    ),
                  },
                  {
                    label: "Drive",
                    value: projectData?.fabricator?.drive ? (
                      <a
                        href={projectData?.fabricator.drive}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {projectData?.fabricator.drive}
                      </a>
                    ) : (
                      "Not available"
                    ),
                  },

                  // {
                  //   label: "Files",
                  //   value: Array.isArray(projectData?.files)
                  //     ? projectData?.files.map((file, index) => (
                  //         <Button
                  //           key={index}
                  //           onClick={() => fetchFileAndOpen(file.id)} // Open file in a new tab
                  //         >
                  //           {file.originalName || `File ${index + 1}`}
                  //         </Button>
                  //       ))
                  //     : "Not available",
                  // },
                  {
                    label: "Files",
                    value: Array.isArray(projectData?.fabricator?.files)
                      ? projectData?.fabricator?.files?.map((file, index) => (
                        <a
                          key={index}
                          href={`${import.meta.env.VITE_BASE_URL
                            }/fabricator/fabricator/viewfile/${projectData?.fabricatorID
                            }/${file.id}`} // Use the file path with baseURL
                          target="_blank" // Open in a new tab
                          rel="noopener noreferrer"
                          className="px-5 py-2 text-teal-500 hover:underline"
                        >
                          {file.originalName || `File ${index + 1}`}
                        </a>
                      ))
                      : "Not available",
                  },
                ]?.map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="font-medium text-gray-700">{label}:</span>
                    <span className="text-gray-600">
                      {value || "Not available"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100/50 rounded-lg shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4">
                Project Work Breakdown:
              </h2>
              <div className="flex gap-4">
                <Button onClick={() => handleAllWorkBreakdown(project.id)}>
                  All Work Breakdown
                </Button>
                <Button onClick={() => handleAddWorkBreakdown(project.id)}>
                  Add Work Breakdown
                </Button>
                <Button>Edit Work Breakdown</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedProject && (
        <AddWB projectId={selectedProject} onClose={handleCloseAWB} />
      )}

      {selectedProjectWB && (
        <AllWorkBreakdown
          projectId={selectedProjectWB}
          onClose={handleCloseAllWB}
        />
      )}

      {selectedEditProject && (
        <EditProject project={selectedEditProject} onClose={handleModalClose} />
      )}

      {selectedProjectStatus && (
        <ProjectStatus
          projectId={selectedProjectStatus}
          onClose={handleStatusClose}
        />
      )}
    </div>
  );
};

export default GetProject;
