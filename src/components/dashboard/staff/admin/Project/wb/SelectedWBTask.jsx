import React, { useEffect, useState, useRef } from "react";
import { Input, Button } from "../../../../../index";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import Service from "../../../../../../config/Service";
import AddMoreSubtask from "./AddMoreSubtask.jsx";
import { toast } from "react-toastify";

const SelectedWBTask = ({
  onClose,
  selectedTask,
  selectedTaskId,
  selectedActivity,
  projectId,
}) => {
  const workBreakdown = useSelector(
    (state) => state?.projectData.workBreakdown
  );
  const [workBD, setWorkBD] = useState("");
  const [subTaskBD, setSubTaskBD] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, control, setValue, watch, reset } = useForm();
  const [showTimeFormIndex, setShowTimeFormIndex] = useState(null);
  const [timeFormData, setTimeFormData] = useState({
    unittime: "",
    checkunittime: "",
  });
  
  

  const fetchWorkBD = async () => {
    const workBreakDown = workBreakdown.find(
      (wb) => wb.taskName === selectedTask
    );
    setWorkBD(workBreakDown);
  };

  const fetchSubTasks = async () => {
    const subTasks = await Service.allSubTasks(projectId, selectedTaskId);
    setSubTaskBD(subTasks);
  };

  useEffect(() => {
    fetchSubTasks();
    fetchWorkBD();
  }, []);

  const isQtyZero = subTaskBD.some((subTask) => subTask.QtyNo === 0);
  //new
  const handleTimeUpdateClick = (index) => {
    console.log(index);
    const subTask = subTaskBD[index];
    console.log(subTask.id);
    setShowTimeFormIndex(index);
    setTimeFormData({
      unittime: subTask.unitTime || "",
      checkunittime: subTask.CheckUnitTime || "",
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeFormSave = async () => {
    const updated = [...subTaskBD];
    const index = showTimeFormIndex;
    const subtaskID = updated[index]?.id;
    const qty = parseFloat(updated[index].QtyNo) || 0;
    const unitTime = parseFloat(timeFormData.unittime) || 0;
    const checkUnitTime = parseFloat(timeFormData.checkunittime) || 0;

    const body = {
      unitTime: unitTime,
      // description:description,
      CheckUnitTime: checkUnitTime,
      execHr: parseFloat((qty * unitTime).toFixed(2)),
      checkHr: parseFloat((qty * checkUnitTime).toFixed(2)),
    };

    try {
      await Service.editOneSubTask(subtaskID, body);
      updated[index] = { ...updated[index], ...body };
      setSubTaskBD(updated);
      toast.success("Time updated successfully");
    } catch {
      toast.error("Failed to update time");
    }
    console.log(updated[index]);

    setShowTimeFormIndex(null);
    setTimeFormData({ unittime: "", checkunittime: "" });
  };
  //Adding the whole subtask to get the ExecHr and CheckingHr
  const onSubmit = async (data) => {
    try {
      const workBreakdown = data?.subTasks?.map((workBD) => ({
        ...workBD,
        wbsactivityID: selectedTaskId,
        projectID: projectId,
      }));
      await Service.addWorkBreakdown(projectId, selectedTaskId, workBreakdown);
      toast.success("Work breakdown data added successfully!");
      fetchSubTasks();
      reset();
    } catch (error) {
      toast.error("Error adding work breakdown data");
    }
  };

  //EDIT QUANTITY
  const [editQuantity, setEditQuantity] = useState();
  const [quanityForm, setQuantityForm] = useState({
    qty: "",
    unittime: "",
    checkunittime:""
  })
  
  {/*const handleTimeUpdateClick = (index) => {
    console.log(index);
    const subTask = subTaskBD[index];
    console.log(subTask.id);
    setShowTimeFormIndex(index);
    setTimeFormData({
      unittime: subTask.unitTime || "",
      checkunittime: subTask.CheckUnitTime || "",
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeFormData((prev) => ({ ...prev, [name]: value }));
  };*/}

  const handleQuantityUpdateSave = async (index) => {
    console.log(index)
    const updated = [...subTaskBD];
    const subtaskID = updated[index]?.id;
    const qty = parseFloat(updated[index].QtyNo) || 0;
    const unitTime = parseFloat(quanityForm.unittime) || 0;
    const checkUnitTime = parseFloat(quanityForm.checkunittime) || 0;

    const body = {
      unitTime: unitTime,
      // description:description,
      CheckUnitTime: checkUnitTime,
      execHr: parseFloat((qty * unitTime).toFixed(2)),
      checkHr: parseFloat((qty * checkUnitTime).toFixed(2)),
    };

    try {
      await Service.editOneSubTask(subtaskID, body);
      updated[index] = { ...updated[index], ...body };
      setSubTaskBD(updated);
      toast.success("Quantity updated successfully");
    } catch {
      toast.error("Failed to update quantity");
    }
    console.log(updated[index]);

  }
  
  const [editField, setEditField] = useState(0);

  const handleEditField = (index) => {
    console.log("clicked");
    const updatedQuantity = [...subTaskBD];
    console.log(index)
    const subtask = updatedQuantity[index]
    console.log(subtask)
    const qty = parseFloat(updatedQuantity[index].QtyNo);
    console.log(qty)
    setIsEditing(true);
    setIsQuantityClick(true);

  };

  const [isEditing, setIsEditing] = useState(false);
  const userType = sessionStorage.getItem("userType");
  const [isClickQuantity, setIsQuantityClick] = useState(false)
  
  const isAdmin = userType === "admin"
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full p-2 bg-white rounded-lg shadow-lg h-fit md:p-5 md:w-[60%] lg:w-[50%]">
        <div className="flex flex-row justify-between ">
          <Button className="bg-red-500" onClick={() => onClose(true)}>
            Close
          </Button>
        </div>

        <div className="flex flex-row items-center justify-center">
          <div>
            <b>Selected Task:</b>{" "}
            {workBD?.task?.find((task) => task.id === selectedTaskId)?.name}
          </div>
        </div>

        <div className="pt-10 bg-white h-[60vh] overflow-auto rounded-lg">
          <form
            className="flex flex-col gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <table className="w-full text-sm text-center border border-collapse border-gray-600">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 border border-gray-600 ">
                    Sub-Task
                  </th>
                  <th className="px-2 py-1 border border-gray-600 ">Qty</th>
                  <th className="px-2 py-1 border border-gray-600">
                    Execution Hours
                  </th>
                  <th className="px-2 py-1 border border-gray-600">
                    Checking Hours
                  </th>
                  <th className="px-2 py-1 border border-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody>
                {subTaskBD.map((subTask, index) => (
                  <tr key={subTask.id}>
                    <td className="px-2 py-1 border border-gray-600">
                      {subTask.description}
                    </td>

                    <td className="px-2 py-1 border border-gray-600">
                      {/*conditionally check here is missing*/}
                      {subTask.QtyNo}
                      {isClickQuantity && (
                        <Controller
                          name={`subTasks[${index}].QtyNo`}
                          control={control}
                          defaultValue={subTask.QtyNo || 0}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="number"
                              placeholder="QtyNo"
                              disabled={subTask.QtyNo !== 0 && !isClickQuantity}
                              onChange={(e) => {
                                const QtyNo = parseFloat(e.target.value) || 0;
                                const unitTime =
                                  parseFloat(subTask.unitTime) || 0;
                                const CheckUnitTime =
                                  parseFloat(subTask.CheckUnitTime) || 0;

                                setValue(`subTasks[${index}].id`, subTask.id);
                                setValue(
                                  `subTasks[${index}].description`,
                                  subTask.description
                                );
                                setValue(
                                  `subTasks[${index}].execHr`,
                                  (QtyNo * unitTime).toFixed(2)
                                );
                                setValue(
                                  `subTasks[${index}].checkHr`,
                                  (QtyNo * CheckUnitTime).toFixed(2)
                                );
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      )}
                    </td>

                    <td className="px-2 py-1 border border-gray-600">
                      {watch(`subTasks[${index}].execHr`) ||
                        subTask.execHr ||
                        0}
                    </td>

                    <td className="px-2 py-1 border border-gray-600">
                      {watch(`subTasks[${index}].checkHr`) ||
                        subTask.checkHr ||
                        0}
                    </td>
                    {/*new*/}
                    <td className="px-2 py-1 border border-gray-600">
                      {/*Check userType and provide the buttons */}
                      {/* {isAdmin ? (
                        <Button
                          type="button"
                          onClick={() => handleTimeUpdateClick(index)}
                          className="text-white bg-blue-500"
                        >
                          Update Time
                        </Button>
                      ) : (
                        <Button>Not for admin</Button>
                      )} */}
                      <Button
                        type="button"
                        onClick={() => handleTimeUpdateClick(index)}
                        className="text-white bg-blue-500"
                      >
                        Update Time
                      </Button>
                    </td>
                    {/*new*/}
                    <td className="px-2 py-1 border border-gray-600">
                      {!isEditing ? (
                        <Button onClick={() => handleEditField(index)}>
                          Edit Quantity
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          onClick={() => handleQuantityUpdateSave(index)}
                        >
                          Save
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!isQtyZero ? (
              <Button
                className="bg-blue-gray-500"
                type="submit"
                disabled={!isQtyZero}
              >
                Added
              </Button>
            ) : (
              <Button type="submit" disabled={!isQtyZero}>
                Add
              </Button>
            )}
          </form>
        </div>
        {/*new*/}
        {showTimeFormIndex !== null && (
          //update unit time and check unit time
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg p-6 shadow-xl w-[90%] max-w-md">
              <h2 className="mb-4 text-xl font-bold">
                Update UnitTime for Subtask
              </h2>
              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  name="unittime"
                  value={timeFormData.unittime}
                  onChange={handleTimeChange}
                  placeholder="Unit Time"
                />
                <Input
                  type="number"
                  name="checkunittime"
                  value={timeFormData.checkunittime}
                  onChange={handleTimeChange}
                  placeholder="Check Unit Time"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button className="bg-green-500" onClick={handleTimeFormSave}>
                  Save
                </Button>
                <Button
                  className="bg-red-500"
                  onClick={() => setShowTimeFormIndex(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        {/*new*/}
        <div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-5 text-white bg-teal-600 w-[100%] ml-2"
          >
            Add More Subtask
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <AddMoreSubtask
          handleClose={() => setIsModalOpen(false)}
          selectedTaskId={selectedTaskId}
          projectId={projectId}
          fetchSubTask={fetchSubTasks}
        />
      )}
    </div>
  );
};

export default SelectedWBTask;
