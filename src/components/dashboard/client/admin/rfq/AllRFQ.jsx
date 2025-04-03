import React from "react";
import { useState } from "react";
import Button from "../../../../fields/Button";
import ViewRFQ from "./ViewRFQ";

function AllRFQ() {
  const data = [
    {
      id: 1,
      fabricatorName: "Fabricator 1",
      clientName: "Client 1",
      projectName: "Project 1",
      mailID: "fabricator1@gmail.com",
      subject: "Subject 1",
      date: "2023-10-01",
      status: "Open",
      rfqStatus: "Pending",
      action: "View",
    },
    {
      id: 2,
      fabricatorName: "Fabricator 2",
      clientName: "Client 2",
      projectName: "Project 2",
      mailID: "fabricator2@gmail.com",
      subject: "Subject 2",
      date: "2023-10-01",
      status: "Open",
      rfqStatus: "Pending",
      action: "View",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    fabricator: "",
    project: "",
    status: "",
  });

  const [RFQ, setRFQ] = useState();

  const handleSearch = (e) => {
    const term = e.target.value;
    console.log(term);
    setSearchTerm(term);
  };

  const searchHandler = (searchTerm) => {
    const searchedData = data.filter(
      (data) =>
        data.fabricatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const [click, setClick] = useState(false);

  const handleClick = (e, data) => {
    setClick(!click);
    console.log(data);
  };
  const handleViewClick = (data) => {
    console.log(data);
    setClick(!click);
  };
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
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-2 py-1 text-center">
                    No RFQ Found
                  </td>
                </tr>
              ) : (
                data.map((data, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-2 py-1">{data.fabricatorName}</td>
                    <td className="px-2 py-1">{data.clientName}</td>
                    <td className="px-2 py-1">{data.projectName}</td>
                    <td className="px-2 py-1">{data.mailID}</td>
                    <td className="px-2 py-1">{data.subject}</td>
                    <td className="px-2 py-1">{data.date}</td>
                    <td className="px-2 py-1">{data.rfqStatus}</td>
                    <td className="px-2 py-1">
                      <div>
                        <Button onClick={() => handleViewClick(data)}>
                          View
                        </Button>
                      </div>
                      {click && <ViewRFQ />}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllRFQ;
