/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import AddFiles from "./AddFiles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Service from "../../../../../config/Service";
import { updateProjectData } from "../../../../../store/projectSlice";
import { CustomSelect, Input,Button } from "../../../../index";
import { useEffect, useState } from "react";
const EditProject = ({ project, onClose }) => {
  const [teamOptions, setTeamOptions] = useState([]);
  const teams = useSelector((state) => state?.userData?.teamData?.data);
  console.log("Project", project);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: project?.name || "",
      fabricator: project?.fabricator?.id || "",
      description: project?.description || "",
      duration: project?.duration || "",
      startDate: project?.startDate || "",
      endDate: project?.endDate || "",
      status: project?.status || "",
      stage: project?.stage || "",
      manager: project?.manager?.id || "",
    },
  });

  useEffect(() => {
    const options = teams?.map((team) => ({
      label: team?.name,
      value: team?.id,
    }));
    setTeamOptions(options);
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const updatedTask = await Service.editProject(project?.id, data);
      dispatch(updateProjectData(updatedTask?.data));
      console.log("Successfully Updated Task: ", updatedTask?.data);
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[93%] md:p-5 rounded-lg shadow-lg w-6/12 ">
        <div className="flex justify-between my-5 bg-teal-200/50 p-2 rounded-lg">
          <h2 className="text-2xl font-bold">Edit Project</h2>
          <button
            className="text-xl font-bold bg-teal-500/50 hover:bg-teal-700 text-white px-5 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <Input
                label="Project Name"
                type="text"
                defaultValue={project?.projectName}
                {...register("name")}
              />
            </div>
            <div className="my-2">
              <Input
                label="Project Description"
                type="text"
                defaultValue={project?.projectDescription}
                {...register("description")}
              />
            </div>

            <div>
              <Input
                label="End Date"
                type="date"
                defaultValue={project?.projectEndDate}
                {...register("approvalDate")}
              />
            </div>
            <div className="my-2">
              <CustomSelect
                label="Stage"
                name="stage"
                options={[
                  { label: "RFI", value: "RFI" },
                  { label: "IFA", value: "IFA" },
                  { label: "BFA", value: "BFA" },
                  { label: "BFA-Markup", value: "BFA-M" },
                  { label: "RIFA", value: "RIFA" },
                  { label: "RBFA", value: "RBFA" },
                  { label: "IFC", value: "IFC" },
                  { label: "BFC", value: "BFC" },
                  { label: "RIFC", value: "RIFC" },
                  { label: "REV", value: "REV" },
                  { label: "CO#", value: "CO#" },
                ]}
                defaultValue={project?.projectStatus}
                {...register("stage")}
                onChange={setValue}
              />
            </div>
            <div className="my-2">
              <CustomSelect
                label="Status"
                name="status"
                options={[
                  { label: "ACTIVE", value: "ACTIVE" },
                  { label: "ON-HOLD", value: "ON-HOLD" },
                  { label: "INACTIVE", value: "INACTIVE" },
                  { label: "DELAY", value: "DELAY" },
                  { label: "REOPEN", value: "REOPEN" },
                  { label: "COMPLETE", value: "COMPLETE" },
                  { label: "SUBMIT", value: "SUBMIT" },
                  { label: "SUSPEND", value: "SUSPEND" },
                  { label: "CANCEL", value: "CANCEL" },
                ]}
                defaultValue={project?.projectStatus}
                {...register("status")}
                onChange={setValue}
              />
            </div>
            <div className="my-2 h-full z-50">
              <CustomSelect
                label="Team"
                name="team"
                options={teamOptions}
                className="w-full"
                {...register("team")}
                onChange={setValue}
              />
            </div>

            <Button type="submit">Update Project</Button>
          </form>
        </div>
        <AddFiles 
        projectId={project?.id}
        />
      </div>
    </div>
  );
};

export default EditProject;
