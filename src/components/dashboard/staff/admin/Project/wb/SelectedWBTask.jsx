/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { Input, Button } from "../../../../../index";
import { useForm, Controller, set } from "react-hook-form";
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
  const prevDataRef = useRef(subTaskBD);
  
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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isQtyZero = subTaskBD.some((subTask) => subTask.QtyNo === 0);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const workBreakdown = data?.subTasks?.map((workBD) => ({
        ...workBD,
        wbsactivityID: selectedTaskId,
        projectID: projectId,
      }));
      await Service.addWorkBreakdown(projectId, selectedTaskId, workBreakdown);
      toast.success("Work breakdown data added successfully!");
      fetchSubTasks(); // Refresh the list to show the saved data
      setIsSubmitted(true); // Prevent further edits
      reset(); // Reset form fields
    } catch (error) {
      toast.error("Error adding work breakdown data");
    }
  };

  const [editIndex, setEditIndex] = useState(null)
  const [formData, setFormData] = useState({ unitT: "", checkUT: "" })
  

  //handleCancel, handleSave, handleEditClick

  const handleEditClick = (index) => {
    const subTask = subTaskBD[index]
    console.log(subTask);
    setEditIndex(index);
    setFormData({
      unitT: subTask.unitTime || "",
      checkUT: subTask.CheckUnitTime || "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const handleCancel = () => {
    setEditIndex(null)
    setFormData({unitT:'', checkUT:''})
  }
  const handleSave = () => {
    const updated = [...subTaskBD]
    console.log(updated)
    const qty = parseFloat(updated[editIndex].QtyNo) || 0;
    const unitTime = parseFloat(formData.unitT) || 0;
    const CheckUnitTime = parseFloat(formData.checkUT) || 0;

    const execHr = (QtyNo * unitTime).toFixed(2)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full p-2 bg-white rounded-lg shadow-lg h-fit md:p-5 md:w-2/5">
        <div className="flex flex-row justify-between">
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
                  <th className="px-2 py-1 border border-gray-600">Sub-Task</th>
                  <th className="px-2 py-1 border border-gray-600">Qty</th>
                  <th className="px-2 py-1 border border-gray-600">
                    Execution Hours
                  </th>
                  <th className="px-2 py-1 border border-gray-600">
                    Checking Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {subTaskBD.map((subTask, index) => (
                  <tr key={subTask.id}>
                    <td className="px-2 py-1 border border-gray-600">
                      {subTask.description}
                    </td>
                    <td className="px-2 py-1 border border-gray-600">
                      {subTask.QtyNo === 0 || isEditing ? (
                        <Controller
                          name={`subTasks[${index}].QtyNo`}
                          control={control}
                          defaultValue={subTask.QtyNo || 0}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="number"
                              placeholder="QtyNo"
                              disabled={!isEditing && subTask.QtyNo !== 0} // Disable unless editing
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
                      ) : (
                        subTask.QtyNo
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
                    <td
                      className="px-2 py-1 border border-gray-600"
                    >
                      {editIndex === index ? (
                        <>
                          <div>
                            <Input
                              placeholder="enter UT"
                              value={formData.unitT}
                              name="unitTime"
                              onChange={handleChange}
                            />
                            <Input
                              placeholder="enter CUT"
                              value={formData.checkUT}
                              name="CheckUnitTime"
                              onChange={handleChange}
                            />
                          </div>
                          <Button onClick={handleCancel}>Cancel</Button>
                          <Button onClick={handleSave}>Save</Button>
                        </>
                      ) : (
                        <Button onClick={()=>handleEditClick(index)}>Edit--UT</Button>
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
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <Button type="submit" onClick={() => setIsEditing(false)}>
              Save
            </Button>
          )}
        </div>
        <div>
          <Button onClick={() => setIsModalOpen(true)}>Add More Subtask</Button>
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
