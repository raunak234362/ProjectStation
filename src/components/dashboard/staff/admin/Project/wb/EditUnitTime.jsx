import React from 'react'
import {useState} from 'react'
import Input from '../../../../../fields/Input';
import Button from '../../../../../fields/Button';




const EditUnitTime = (handleClose) => {

    const [showTimeFormIndex, setShowTimeFormIndex] = useState(null);
    const [timeFormData, setTimeFormData] = useState({
        unittime: "",
        checkunittime: "",
    });
    
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

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg p-6 shadow-xl w-[90%] max-w-md">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
          <h2 className="mb-4 text-xl font-bold text-black">
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
            <Button
              className="bg-green-500"
              onClick={handleTimeFormSave}
            >
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
    </>
  );
}

export default EditUnitTime