/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../../index";
import Service from "../../../../../config/Service";
import GetSentSubmittals from "./GetSentSubmittals";

// Utility function to get nested values safely
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const AllSubmittals = () => {
  const [submittals, setSubmittals] = useState([]);
  const fabricators = useSelector((state) => state.fabricatorData.fabricatorData);
  const projects = useSelector((state) => state.projectData.projectData);
  const staffs = useSelector((state) => state.userData.staffData);
  const [selectedSubmittals, setSelectedSubmittals] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredSubmittals, setFilteredSubmittals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    fabricator: "",
    project: "",
    status: "",
  });

  console.log(submittals);

  const fetchSubmittals = async () => {
    try {
      const response = await Service.sentSubmittal()
      setSubmittals(response.data);
    } catch (error) {
      console.error(error)
    }

  }

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

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

    if (term) {
      filteredData = filteredData.filter(
        (sub) =>
          sub.remarks.toLowerCase().includes(term.toLowerCase()) ||
          sub.email.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (filters.fabricator) {
      filteredData = filteredData.filter(
        (sub) =>
          sub?.fabricator?.name?.toLowerCase() ===
          filters.fabricator.toLowerCase()
      );
    }

    if (filters.project) {
      filteredData = filteredData.filter(
        (sub) =>
          sub?.fabricator?.project?.name?.toLowerCase() ===
            filters.project.toLowerCase() ||
          sub?.project?.name?.toLowerCase() === filters.project.toLowerCase()
      );
      console.log(filteredData);
    }

    if (filters.status) {
      filteredData = filteredData.filter(
        (sub) => sub.status.toLowerCase() === filters.status
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
    setFilteredSubmittals(filteredData);
  };


  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleViewClick = async (submittalsId) => {
    console.log(submittalsId);
    setSelectedSubmittals(submittalsId);
    setIsModalOpen(true);
  };

  const handleModalClose = async () => {
    setSelectedSubmittals(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchSubmittals()
    filterAndSort(submittals, searchTerm, filters);
  }, [searchTerm, filters]);

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
            {[...new Set(submittals?.map((sub) => sub?.fabricator?.fabName))].map(
              (name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              )
            )}
          </select>
          <select
            name="project"
            value={filters.project}
            onChange={handleFilterChange}
            className="px-2 py-1 rounded border border-gray-300"
          >
            <option value="">Filter by Project</option>
            {[
              ...new Set(
                submittals?.map(
                  (sub) => sub?.project?.name
                )
              ),
            ].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
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
                <th className="px-2 py-1 text-left">Fabricator Name</th>
                <th className="px-2 py-1 text-left">Project Name</th>
                <th className="px-2 py-1">Subject/Remarks</th>
                <th className="px-2 py-1">Recipients</th>
                <th className="px-2 py-1">Date</th>
                {/* <th className='px-2 py-1'>RFI Status</th> */}
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmittals?.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan="6" className="text-center">
                    No sent RFI Found
                  </td>
                </tr>
              ) : (
                filteredSubmittals?.map((sub, index) => (
                  <tr key={sub?.id} className="hover:bg-blue-gray-100 border">
                    <td className="border px-2 py-1 text-left">
                      {sub?.fabricator?.fabName}
                    </td>
                    <td className="border px-2 py-1">
                      {sub?.project?.name}
                    </td>
                    <td className="border px-2 py-1">{sub?.subject}</td>
                    <td className="border px-2 py-1">{sub?.recepients.email}</td>
                    <td className="border px-2 py-1">{sub?.date}</td>
                    <td className="border px-1 py-1">{sub.status}</td>
                    <Button onClick={() => handleViewClick(sub.id)}>
                      View
                    </Button>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {selectedSubmittals && (
          <GetSentSubmittals
          submittalId={selectedSubmittals}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default AllSubmittals;
