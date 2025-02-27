/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, GetSentRFI } from "../../../../index";

// Utility function to get nested values safely
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const AllSentRFI = () => {
  const RFI = useSelector((state) => state?.projectData?.rfiData);

  const [selectedRFI, setSelectedRFI] = useState(null);
  const [isModalOpen, setIsModalOpen]=useState(false)
  const [filteredRFI, setFilteredRFI] = useState(RFI);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    fabricator: "",
    project: "",
    status: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    filterAndSort(RFI, searchTerm, filters);
  }, [RFI, searchTerm, filters, sortConfig]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filterAndSort = (data, term, filters) => {
    let filteredData = data || [];

    // Apply search filter
    if (term) {
      filteredData = filteredData.filter(
        (rfi) =>
          rfi.remarks.toLowerCase().includes(term.toLowerCase()) ||
          rfi.email.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply dropdown filters
    if (filters.fabricator) {
      filteredData = filteredData.filter(
        (rfi) =>
          rfi?.fabricator?.name.toLowerCase() === filters.fabricator.toLowerCase()
      );
    }
    if (filters.project) {
      filteredData = filteredData.filter(
        (rfi) =>
          rfi?.fabricator?.project?.name?.toLowerCase() ===
            filters.project.toLowerCase() ||
          rfi?.project?.name?.toLowerCase() === filters.project.toLowerCase()
      );
    }
    if (filters.status) {
      filteredData = filteredData.filter(
        (rfi) => rfi.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key) || "";
        const bValue = getNestedValue(b, sortConfig.key) || "";

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (sortConfig.key === "date") {
          return sortConfig.direction === "asc"
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      });
    }

    setFilteredRFI(filteredData);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleViewClick = async(fabricatorId)=>{
    
    setSelectedRFI(fabricatorId)
    setIsModalOpen(true)
  }
  
  console.log(selectedRFI)

  const handleModalClose= async()=>{
    setSelectedRFI(null)
    setIsModalOpen(false)
  }


  return (
    <div className="bg-white/70 rounded-lg md:w-full w-[90vw]">
      <div className="mt-5 h-auto p-4">
        {/* Search and Filter Options */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by remarks or recipient"
            value={searchTerm}
            onChange={handleSearch}
            className="px-2 py-1 rounded border border-gray-300"
          />
          <select
            name="fabricator"
            value={filters.fabricator}
            onChange={handleFilterChange}
            className="px-2 py-1 rounded border border-gray-300"
          >
            <option value="">Filter by Fabricator</option>
            {[...new Set(RFI.map((rfi) => rfi?.fabricator?.name))].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select
            name="project"
            value={filters.project}
            onChange={handleFilterChange}
            className="px-2 py-1 rounded border border-gray-300"
          >
            <option value="">Filter by Project</option>
            {[...new Set(RFI.map((rfi) => rfi?.fabricator?.project?.name || rfi?.project?.name))].map(
              (name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              )
            )}
          </select>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-2 py-1 rounded border border-gray-300"
          >
            <option value="">Filter by Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-center text-sm md:text-lg rounded-xl">
            <thead>
              <tr className="bg-teal-200/70">
                <th
                  className="px-2 py-1 text-left cursor-pointer"
                  onClick={() => handleSort("fabricator.name")}
                >
                  Fabricator Name
                </th>
                <th
                  className="px-2 py-1 text-left cursor-pointer"
                  onClick={() => handleSort("fabricator.project.name")}
                >
                  Project Name
                </th>
                <th className="px-2 py-1">Subject/Remarks</th>
                <th className="px-2 py-1">Recipients</th>
                <th
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Date
                </th>
                <th className="px-2 py-1">RFI Status</th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRFI.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan="7" className="text-center">
                    No sent RFI Found
                  </td>
                </tr>
              ) : (
                filteredRFI.map((rfi) => (
                  <tr key={rfi?.id} className="hover:bg-blue-gray-100 border">
                    <td className="border px-2 py-1 text-left">
                      {rfi?.fabricator?.name || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {rfi?.fabricator?.project?.name || rfi?.project?.name || "N/A"}
                    </td>
                    <td className="border px-2 py-1">{rfi?.remarks}</td>
                    <td className="border px-2 py-1">{rfi?.email}</td>
                    <td className="border px-2 py-1">{rfi?.date}</td>
                    <td className="border px-2 py-1">{rfi?.status}</td>
                    <td className="border px-2 py-1">
                    <Button onClick={() => handleViewClick(rfi.id)}>View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {selectedRFI && (
          <GetSentRFI
          rfiId={selectedRFI}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default AllSentRFI;
