/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Service from "../../../../../config/Service";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AddFiles, AddWB, Button, EditProject } from "../../../../index";
import { BASE_URL } from "../../../../../config/constant";

const GetProject = ({ projectId, onClose }) => {
  const [project, setProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [addWorkBreakdown, setAddWorkBreakdown] = useState(false);
  const [editWorkBreakdown, setEditWorkBreakdown] = useState(false);
  const [selectedEditProject, setSelectedEditProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectData = useSelector((state) =>
    state?.projectData.projectData.find((project) => project.id === projectId)
  );
  console.log("Project Data", projectData);


  

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

  const handleCloseAWB = async () => {
    setAddWorkBreakdown(false);
    setSelectedProject(null);
  };

  const handleClose = async () => {
    onClose(true);
  };

  // console.log("Project", project?.files(map((file) => file.path))


  const handleEditClick = () => {
    setIsModalOpen(true);
    setSelectedEditProject(projectData);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEditProject(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-50">
      <div className="bg-white h-fit md:p-5 rounded-lg shadow-lg w-6/12 ">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleEditClick}>Edit</Button>
        </div>

        {/* header */}
        <div className="top-2 w-full flex justify-center z-10">
          <div className="mt-2">
            <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
              Project: {projectData?.name || "Unknown"}
            </div>
          </div>
        </div>

        <div className=" h-fit overflow-y-auto rounded-lg shadow-lg">
          <div className="bg-gray-100/50 rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4">Project Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                { label: "End Date", value: projectData?.approvalDate },
                {
                  label: "Department Manager",
                  value: projectData?.manager?.f_name,
                },
                {
                  label: "Project Manager",
                  value: projectData?.manager?.f_name,
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
                          href={`${BASE_URL}/project/projects/viewfile/${projectId}/${file.id}`} // Use the file path with baseURL
                          target="_blank" // Open in a new tab
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
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
              <Button>All Work Breakdown</Button>
              <Button onClick={() => handleAddWorkBreakdown(project.id)}>
                Add Work Breakdown
              </Button>
              <Button>Edit Work Breakdown</Button>
            </div>
          </div>
        </div>
      </div>
      {selectedProject && (
        <AddWB projectId={selectedProject} onClose={handleCloseAWB} />
      )}

      {selectedEditProject && (
        <EditProject project={selectedEditProject} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default GetProject;
