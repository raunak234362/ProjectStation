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

  const projectData = useSelector((state) => state?.projectData.projectData);

  const fetchFiles =async()=>{
    const fileData =await Service.allProjectFile(projectId)
  }

  const fetchProject = async () => {
    try {
      const project = projectData.find((project) => project.id === projectId);
      if (project) {
        setProject(project);
      } else {
        console.log("Project not found");
      }
    } catch (error) {
      console.log("Error fetching project:", error);
    }
  };

  const handleAddWorkBreakdown = () => {
    console.log("Add Work Breakdown");
    setSelectedProject(project.id);
    setAddWorkBreakdown(true);
  };

  const handleCloseAWB = async()=>{
    setAddWorkBreakdown(false);
    setSelectedProject(null);
  }

  const handleClose = async () => {
    onClose(true);
  };

  // console.log("Project", project?.files(map((file) => file.path))

  useEffect(() => {
    fetchProject();
  }, [projectId]);


  const handleEditClick = () => {
    setIsModalOpen(true);
    setSelectedEditProject(project);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEditProject(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[93%] md:p-5 rounded-lg shadow-lg w-11/12 ">
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
              Project: {project?.name || "Unknown"}
            </div>
          </div>
        </div>

        <div className="p-5 h-[88%] overflow-y-auto rounded-lg shadow-lg">
          <div className="bg-gray-100/50 rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4">Project Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Fabricator", value: project?.fabricator?.fabName },
                { label: "Description", value: project?.description },
                { label: "Estimated Hours", value: project?.estimatedHours },
                { label: "Status", value: project?.status },
                { label: "Stage", value: project?.stage },
                { label: "Tool", value: project?.tools },
                { label: "Start Date", value: project?.startDate },
                { label: "End Date", value: project?.approvalDate },
                { label: "Department", value: project?.department?.name },
                { label: "Department Manager", value: project?.manager?.f_name },
                { label: "Project Manager", value: project?.manager?.f_name },
                {
                  label: "Files",
                  value: Array.isArray(project?.files)
                    ? project?.files.map((file, index) => (
                        <a
                          key={index}
                          href={`${BASE_URL}${file.path}`} // Use the file path with baseURL
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
              <Button >
                All Work Breakdown
              </Button>
              <Button onClick={() => handleAddWorkBreakdown(project.id)}>Add Work Breakdown</Button>
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
