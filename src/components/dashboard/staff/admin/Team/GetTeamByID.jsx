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

const GetTeamByID = ({ team, taskID, isOpen, onClose }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberOptions, setMemberOptions] = useState([]);
  const [members, setMembers] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isFailedOpen, setIsFailedOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const teamID = team.data.data.id;
  console.log(teamID);

  const taskData = useSelector((state) =>
    state?.userData?.teamData?.data?.find((team) => team.id === teamID)
  );

  const staffData = useSelector((state) => state?.userData?.staffData?.data);
  console.log(taskData);

  function segerateTeam(){
    let teamMembers ={}
  }

  function fetchStaff() {
    const uniqueMembers = new Set();

    // const memberOptions = staffData?.members
    //   ?.map((staff) => {
    //     const name = staff?.f_name;
    //     if (name) {
    //     //   uniqueMembers.add(name);
    //       return {
    //         label: name,
    //         value: staff?.id
    //       };
    //     }
    //     return null;
    //   })
    //   .filter(Boolean) // Remove null values from the array
    //   .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

    // setMemberOptions(memberOptions);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const addMembers = async (data) => {
    console.log(data)
    try{
        const response = await Service.addTeamMember(teamID, data);
       return response();
    }catch(error){
        console.error(error);
    }
  }

  if (!isOpen) return null;

  const handleEditClick = () => {
    setIsModalOpen(true);
    setSelectedTask(team);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  const closeFailedModal = () => {
    setIsFailedOpen(false);
  };
  const closeSuccessModal = () => {
    // onClose()
    setIsSuccessOpen(false);
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
                        options={[{ label: "Select User", value: "" },...memberOptions]}
                        {...register("employee")}
                        onChange={setValue}
                      />
                    </div>
                    <div className="my-2">
                      <CustomSelect
                        label="Select Role: "
                        name="role"
                        options={[
                          { label: "GUEST", value: "GUEST" },
                          { label: "LEADER", value: "LEADER" },
                          { label: "MEMBER", value: "MEMBER" },
                          { label: "MANAGER", value: "MANAGER" },
                          { label: "MODELER", value: "MODELER" },
                          { label: "CHECKER", value: "CHECKER" },
                          { label: "DETAILER", value: "DETAILER" },
                          { label: "ERECTER", value: "ERECTER" },
                          { label: "ADMIN", value: "ADMIN" },
                        ]}
                        {...register("role")}
                        onChange={setValue}
                      />
                    </div>
                    {/* <div className="my-2">
                        <Button type="submit">Add Member</Button>
                    </div> */}

                    <div className="flex justify-end mt-4">
                      <Button type="submit">Add</Button>
                      <Dialog open={isSuccessOpen} handler={setIsSuccessOpen}>
                        <DialogHeader>User Added</DialogHeader>
                        <DialogBody>The User is added successfully!</DialogBody>
                        <DialogFooter>
                          <Button
                            variant="gradient"
                            color="green"
                            onClick={closeSuccessModal}
                          >
                            Close
                          </Button>
                        </DialogFooter>
                      </Dialog>
                      <Dialog open={isFailedOpen} handler={setIsFailedOpen}>
                        <DialogHeader>User not Added</DialogHeader>
                        <DialogBody>The User is not added!</DialogBody>
                        <DialogFooter>
                          <Button
                            variant="gradient"
                            color="red"
                            onClick={closeFailedModal}
                          >
                            Close
                          </Button>
                        </DialogFooter>
                      </Dialog>
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
