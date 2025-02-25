/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../../../../fields/Button";
import { useSelector } from "react-redux";
import EditEmployee from "./EditEmployee";

const GetEmployee = ({ employeeID, onClose }) => {
  const [selectedEditEmployee, setSelectedEditEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const staffData = useSelector((state) =>
    state?.userData?.staffData.find((employee) => employee.id === employeeID)
  );
  const departments = useSelector((state)=>state?.userData?.departmentData)


  const handleClose = async () => {
    onClose(true);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
    setSelectedEditEmployee(staffData);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEditEmployee(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85">
      <div className="w-11/12 p-5 overflow-y-auto bg-white rounded-lg shadow-lg h-fit md:p-5 md:w-6/12 ">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleEditClick}>Edit</Button>
        </div>
        {/* header */}
        <div className="z-10 flex justify-center w-full top-2">
          <div className="mt-2">
            <div className="px-3 py-2 font-bold text-white bg-teal-400 rounded-lg shadow-md md:px-4 md:text-2xl">
              Username: {staffData?.username || "Unknown"}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto rounded-lg shadow-lg  h-fit">
          <div className="p-5 rounded-lg shadow-md bg-gray-100/50">
          <div className="grid grid-cols-1 gap-6 overflow-x-hidden overflow-y-hidden md:grid-cols-2">
              {[
                { label: "First Name", value: staffData?.f_name },
                { label: "Middle Name", value: staffData?.m_name },
                { label: "Last Name", value: staffData?.l_name },
                { label: "WBT-ID", value: staffData?.emp_code },
                { label: "Phone", value: staffData?.phone },
                { label: "Email", value: staffData?.email },
                { label: "Department", value: departments?.find((department) => department.id === staffData?.department)?.name },
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
        </div>
      </div>

      {selectedEditEmployee && (
        <EditEmployee
          employee={selectedEditEmployee}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default GetEmployee;
