import React from 'react'
import { useState } from 'react';

function AllRFQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    fabricator: "",
    project: "",
    status: "",
  });
  const [RFQ, setRFQ] = useState();


  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    console.log(term);
  }
  
  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }
  
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="w-full h-[89vh] overflow-y-hidden mx-5">
          <input
            type="text"
            placeholder="Search by remarks or recipient"
            className="w-[96%] px-2 py-1 m-5 border border-gray-300 rounded "
            onChange={handleSearch}
          />
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            <div
              className="px-2 py-1 border border-gray-300 rounded"
              onChange={handleFilter}
            >
              <select
                name="fabricator"
                onChange={handleFilter}
                className="px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">Filter by Fabricator</option>
                <option value="Fabricator 1">Fabricators</option>
              </select>
            </div>
            <div
              className="px-2 py-1 border border-gray-300 rounded"
              onChange={handleFilter}
            >
              <select
                name="project"
                onChange={handleFilter}
                className="px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">Filter by Project</option>
                <option value="Project 1">Projects</option>
              </select>
            </div>
            <div
              className="px-2 py-1 border border-gray-300 rounded"
              onChange={handleFilter}
            >
              <select
                name="status"
                onChange={handleFilter}
                className="px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">Filter by Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          <table className="min-w-full text-sm text-center border-collapse md:text-lg rounded-xl">
            <thead>
              <tr className="bg-teal-200/70">
                <th className="px-2 py-1">Fabricator Name</th>
                <th className="px-2 py-1">Client Name</th>
                <th className="px-2 py-1">Project Name</th>
                <th className="px-2 py-1">Mail ID</th>
                <th className="px-2 py-1">Subject/Remarks</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">RFQ Status</th>
                <th className="px-2 py-1">RFQ Forward</th>
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="px-2 py-1 text-center">
                  No RFQ Found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllRFQ