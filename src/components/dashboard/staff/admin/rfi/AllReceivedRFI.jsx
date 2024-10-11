/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

const AllReceivedRFI = () => {
  const RFI = useSelector((state) => state?.projectData.rfiData);
  console.log(RFI);

  return (
    <div className="bg-white/70 rounded-lg md:w-full w-[90vw]">
      <div className="mt-5 h-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-center text-sm md:text-lg rounded-xl">
            <thead>
              <tr className="bg-teal-200/70">
                <th className="px-2 py-1">Fabricator Name</th>
                <th className="px-2 py-1">Client Name</th>
                <th className="px-2 py-1">Project Name</th>
                <th className="px-2 py-1">mail ID</th>
                <th className="px-2 py-1">Subject/Remarks</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">RFI Status</th>
                <th className="px-2 py-1">RFI Forward</th>
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {RFI.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan="6" className="text-center">
                    No received RFI Found
                  </td>
                </tr>
              ) : (
                RFI?.map((project, index) => (
                  <tr
                    key={project.id}
                    className="hover:bg-blue-gray-100 border"
                  >
                    <td className="border px-2 py-1 text-left">
                      {project.fabricator}
                    </td>
                    <td className="border px-2 py-1 text-left">
                      {project.client.name}
                    </td>
                    <td className="border px-2 py-1">{project.project}</td>
                    <td className="border px-2 py-1">{project.mail}</td>
                    <td className="border px-2 py-1">{project.remarks}</td>
                    <td className="border px-2 py-1">10-5-2024</td>
                    <td className="border px-2 py-1">Open</td>
                    <td className="border px-2 py-1">Forward</td>
                    <td className="border px-2 py-1">Button</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllReceivedRFI;
