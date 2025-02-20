/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, CustomSelect, Input } from "../../../../index";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Service from "../../../../../config/Service";
import { toast } from "react-toastify";

const GetTeamByID = ({ team, taskID, isOpen, onClose }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberOptions, setMemberOptions] = useState([]);
  const [members, setMembers] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isFailedOpen, setIsFailedOpen] = useState(false);
  const [segregatedMembers, setSegregatedMembers] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const teamID = team.data.data.id;
  const taskData = useSelector((state) =>
    state?.userData?.teamData?.data?.find((team) => team.id === teamID)
  );

  const staffData = useSelector((state) => state?.userData?.staffData);

  const [jobStudyRole, setJobStudyRole] = useState("");

  function segerateTeam() {
    let teamMembers = {};
  }

  function fetchStaff() {

    const memberOptions = staffData
      ?.map((staff) => {
        const name = `${staff?.f_name || ''} ${staff?.m_name || ''} ${staff?.l_name || ''}`.trim();
        if (name) {
          //   uniqueMembers.add(name);
          return {
            label: name,
            value: staff?.id,
          };
        }
        return null;
      })
      .filter(Boolean) 
      .sort((a, b) => a.label.localeCompare(b.label)); 

    setMemberOptions(memberOptions);
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    if (taskData?.members) {
      const membersByRole = taskData.members.reduce((acc, member) => {
        const role = member.role || "MEMBER";
        if (!acc[role]) {
          acc[role] = [];
        }
        acc[role].push(member);
        return acc;
      }, {});
      setSegregatedMembers(membersByRole);
    }
  }, []);

  const addMembers = async (data) => {
    try {
      const response = await Service.addTeamMember(teamID, data);
      toast.success("Team member has been added successfully!");
    } catch (error) {
      toast.error("Failed to add team member");
      console.error("Error adding team member:", error);
    }
  };

  if (!isOpen) return null;

  // const handleEditClick = () => {
  //   setIsModalOpen(true);
  //   setSelectedTask(team);
  // };
  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  //   setSelectedTask(null);
  // };
  const closeFailedModal = () => {
    setIsFailedOpen(false);
  };
  const closeSuccessModal = () => {
    // onClose()
    setIsSuccessOpen(false);
  };

  const renderMembers = () => {
    return Object.entries(segregatedMembers).map(([role, members]) => (
      <div key={role} className="mb-3">
        <strong className="text-gray-700">{role}:</strong>
        <div className="ml-4">
          {members.map((member) => (
            <div key={member.id} className="text-gray-600">
              {staffData?.find((staff) => staff?.id === member?.id)?.f_name}{" "}
              {staffData?.find((staff) => staff?.id === member?.id)?.l_name}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  // Function to get available roles based on job study
  const getAvailableRoles = () => {
    const baseRoles = [
      { label: "GUEST", value: "GUEST" },
      { label: "MODELER", value: "MODELLER" },
      { label: "DETAILER", value: "DETAILER" },
      { label: "ERECTION", value: "ERECTION" },
      { label: "CHECKER", value: "CHECKER" },
    ];

    // Add specific role based on job study
    switch (jobStudyRole) {
      case "Guest":
        return [...baseRoles, { label: "GUEST", value: "GUEST" }];
      case "Modeling":
        return [...baseRoles, { label: "MODELER", value: "MODELER" }];
      case "Detailing":
        return [...baseRoles, { label: "DETAILER", value: "DETAILER" }];
      case "Erection":
        return [...baseRoles, { label: "ERECTER", value: "ERECTER" }];
      case "Checking":
        return [...baseRoles, { label: "CHECKER", value: "CHECKER" }];
      default:
        return baseRoles;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[92%] fixed top-[8%] overflow-x-auto p-5 rounded-lg shadow-lg w-screen ">
        <div className="text-3xl font-bold flex justify-between text-white bg-teal-200/50 shadow-xl px-5 py-1 mt-2 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800">Team Details</h2>
          <button
            className="text-xl font-bold bg-teal-500/50 hover:bg-teal-700 text-white px-5 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="h-[80vh] overflow-y-auto p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-teal-100/70 rounded-lg p-5">
              <div>
                <div className="my-2">
                  <strong className="text-gray-700">Team Name:</strong>{" "}
                  {taskData?.name}
                </div>
                <p className="mb-2">
                  <strong className="text-gray-700">Manager:</strong>{" "}
                  {taskData?.manager?.f_name} {taskData?.manager?.l_name}
                </p>
                <div className="mb-2">
                  <strong className="text-gray-700">
                    Team Members by Role:
                  </strong>
                  {renderMembers()}
                </div>
              </div>
            </div>
            <div className=" bg-teal-100/50 p-5  overflow-y-auto rounded-lg my-1">
              <strong className="text-gray-700 text-lg">
                Add Team Member:
              </strong>
              <div className="h-[50vh]">
                <form onSubmit={handleSubmit(addMembers)}>
                  <div className="my-2">
                    <CustomSelect
                      label="Select Member: "
                      name="employee"
                      options={[
                        { label: "Select User", value: "" },
                        ...memberOptions,
                      ]}
                      {...register("employee")}
                      onChange={setValue}
                    />
                  </div>
                  <div className="my-2">
                    <CustomSelect
                      label="Select Role: "
                      name="role"
                      options={[
                        { label: "Select Role", value: "" },
                        ...getAvailableRoles(),
                      ]}
                      {...register("role")}
                      onChange={setValue}
                      disabled={!watch("employee")} // Disable if no employee is selected
                    />
                  </div>
                  <div className="my-2">
                        <Button type="submit">Add Member</Button>
                    </div>

                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetTeamByID;
