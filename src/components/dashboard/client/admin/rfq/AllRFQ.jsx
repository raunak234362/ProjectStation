import React, { useState, useEffect } from "react";
import Button from "../../../../fields/Button";
import ViewRFQ from "./ViewRFQ";
import Service from "../../../../../config/Service";




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
      fabricatorName: "xyz 2",
      clientName: "xyz 2",
      projectName: "xyz 2",
      mailID: "xyz@gmail.com",
      subject: "xyz 2",
      date: "2023-10-01",
      status: "Open",
      rfqStatus: "Pending",
      action: "View",
    },
    {
      id: 3,
      fabricatorName: "fab",
      clientName: "fab 2",
      projectName: "fab 2",
      mailID: "fab@gmail.com",
      subject: "fab 2",
      date: "2023-10-11",
      status: "closed",
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

  const [rfq, setRfq] = useState(data);
  const [viewData, setViewData] = useState(null);
const [click, setClick] = useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchReceivedRFQ = async () => {
    try {
      const info = await Service.sentRFQ();
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReceivedRFQ();
  }, []);

  
  useEffect(() => {
    const filteredData = data.filter((item) => {
      //search filter
      const matchedSearchTerm =
        item.fabricatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.clientName.toLowerCasnsole().includes(searchTerm.toLowerCase()) ||
        item.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      //filter dropdown fabricator
      const matchedFabricator =
        !filters.fabricator ||
        item.fabricatorName.toLowerCase() === filters.fabricator.toLowerCase();
      //filter dropdown project
      const matchedProject =
        !filters.project ||
        item.projectName.toLowerCase() === filters.project.toLowerCase();
      //filter dropdown status
      const matchedStatus =
        !filters.status ||
        item.status.toLowerCase() === filters.status.toLowerCase();

      return (
        matchedSearchTerm &&
        matchedFabricator &&
        matchedProject &&
        matchedStatus
      );
    });

    setRfq(filteredData);
  }, [searchTerm, filters]);

  
  const handleViewClick = (data) => {
    setViewData(data);
    setClick(true);
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
            <div className="px-2 py-1 border border-gray-300 rounded">
              <select
                name="fabricator"
                onChange={handleFilter}
                className="px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">Filter by Fabricator</option>
                <option value="Fabricator 1">Fabricator 1</option>
              </select>
            </div>
            <div className="px-2 py-1 border border-gray-300 rounded">
              <select
                name="project"
                onChange={handleFilter}
                className="px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">Filter by Project</option>
                <option value="Project 1">Project 1</option>
              </select>
            </div>
            <div className="px-2 py-1 border border-gray-300 rounded">
              <select
                name="status"
                onChange={handleFilter}
                className="px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">Filter by Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <table
            className="min-w-full text-sm text-center border-collapse md:texport default AllRFQ;ext-lg rounded-xl"
          >
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
              {rfq.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-2 py-1 text-center">
                    No RFQ Found
                  </td>
                </tr>
              ) : (
                data.map((data) => (
                  <tr key={data.id} className="bg-white">
                    <td className="px-2 py-1">{data.fabricatorName}</td>
                    <td className="px-2 py-1">{data.clientName}</td>
                    <td className="px-2 py-1">{data.projectName}</td>
                    <td className="px-2 py-1">{data.mailID}</td>
                    <td className="px-2 py-1">{data.subject}</td>
                    <td className="px-2 py-1">{data.date}</td>
                    <td className="px-2 py-1">{data.rfqStatus}</td>
                    <td className="px-2 py-1">
                      <Button onClick={() => handleViewClick(data)}>
                        View
                      </Button>
                      {/* {click && <ViewRFQ />} */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {viewData && <ViewRFQ />}
    </>
  );
}

export default AllRFQ;
