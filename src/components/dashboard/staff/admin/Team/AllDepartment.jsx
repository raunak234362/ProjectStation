/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Service from "../../../../../config/Service";

const AllDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const token = sessionStorage.getItem("token");

  const fetchDepartments = async () => {
    const departmentData = await Service.allDepartment(token);
    setDepartments(departmentData);
    setFilteredDepartments(departmentData); // Initialize filtered departments with all data
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredDepartments].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredDepartments(sortedData);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = departments.filter((department) =>
      department.name.toLowerCase().includes(value) ||
      department.code.toLowerCase().includes(value)
    );
    setFilteredDepartments(filtered);
  };

  console.log(departments)

  return (
    <div className="bg-white/70 rounded-lg md:w-full w-[90vw]">
      <div className="mt-5 p-4">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by department name or code"
          className="border px-2 py-2 rounded mb-4 w-full md:w-1/3"
        />
      </div>

      <div className="mt-2 mx-3 bg-white overflow-x-auto">
        {/* Making the table scrollable horizontally on small screens */}
        <table className="h-fit w-full border-collapse text-center md:text-xl text-xs rounded-xl">
          <thead>
            <tr className="bg-teal-200/70">
              <th className="px-5 py-2 cursor-pointer text-left" onClick={() => handleSort("name")}>
                S.no
              </th>
              <th className="px-5 py-2 cursor-pointer text-left" onClick={() => handleSort("name")}>
                Department Name
              </th>
              <th className="px-5 py-2 text-left cursor-pointer" onClick={() => handleSort("employees")}>
                Manager
              </th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments?.length === 0 ? (
              <tr className="bg-white">
                <td colSpan="5" className="text-center">
                  No Departments Found
                </td>
              </tr>
            ) : (
              filteredDepartments?.map((department, index) => (
                <tr key={department.id} className="hover:bg-blue-gray-100 border">
                  <td className="border px-5 py-2 text-left">{index+1}</td>
                  <td className="border px-5 py-2 text-left">{department.name}</td>
                  <td className="border px-5 py-2 text-left">{department.manager}</td>
                  <td className="border px-2 py-1">
                    <button className="text-blue-500 hover:text-blue-700">Action</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDepartment;
