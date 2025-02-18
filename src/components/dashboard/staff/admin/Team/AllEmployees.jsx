/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Service from "../../../../../config/Service";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../fields/Button";
import GetEmployee from "./GetEmployee";

const AllEmployees = () => {
  const token = sessionStorage.getItem("token");
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const staffs = useSelector((state) => state?.userData?.staffData);
const departments = useSelector((state)=>state?.userData?.departmentData?.data)
  // Initialize the filtered staff list when 'staffs' changes
  useEffect(() => {
    if (staffs) {
      setFilteredStaff(staffs);
    }
  }, [staffs]);

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredStaff].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredStaff(sortedData);
  };

  // Filter/Search function
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = staffs?.filter(
      (employee) =>
        `${employee.f_name} ${employee.l_name}`.toLowerCase().includes(value) ||
        employee.email.toLowerCase().includes(value) ||
        employee.designation.toLowerCase().includes(value)
    );
    setFilteredStaff(filtered);
  };

  const handleViewClick = async (projectID) => {
    setSelectedEmployee(projectID);
    setIsModalOpen(true);
  };

  const handleModalClose = async () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white/70 rounded-lg md:w-full w-[90vw]">
      <div className="mt-5 p-4">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name, email, or designation"
          className="border px-2 py-2 rounded mb-4 w-full md:w-1/3"
        />
      </div>

      <div className="mt-2 mx-3 bg-white overflow-auto">
        {/* Making the table scrollable horizontally on small screens */}
        <table className="h-fit w-full border-collapse text-center md:text-xl text-xs rounded-xl">
          <thead>
            <tr className="bg-teal-200/70">
              <th
                className="px-5 py-2 cursor-pointer text-left"
                onClick={() => handleSort("username")}
              >
                S.No
              </th>
              <th
                className="px-5 py-2 cursor-pointer text-left"
                onClick={() => handleSort("username")}
              >
                Username
              </th>
              <th
                className="px-5 py-2 text-left cursor-pointer"
                onClick={() => handleSort("f_name")}
              >
                Employee Name
              </th>
              <th
                className="px-5 py-2 cursor-pointer text-left"
                onClick={() => handleSort("designation")}
              >
                Department
              </th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff?.length === 0 ? (
              <tr className="bg-white">
                <td colSpan="6" className="text-center">
                  No Employees Found
                </td>
              </tr>
            ) : (
              filteredStaff.map((staff, index) => (
                <tr key={staff.id} className="hover:bg-blue-gray-100 border">
                  <td className="border px-5 py-2 text-left">{index + 1}</td>
                  <td className="border px-5 py-2 text-left">
                    {staff.username}
                  </td>
                  <td className="border px-5 py-2 text-left">
                    {staff.f_name} {staff.m_name} {staff.l_name}
                  </td>
                  <td className="border px-5 py-2 text-left">
                    {departments?.find((department)=>department.id===staff.department)?.name}
                  </td>
                  <td className="border px-2 py-1">
                    <Button onClick={() => handleViewClick(staff?.id)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <GetEmployee
          employeeID={selectedEmployee}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default AllEmployees;
