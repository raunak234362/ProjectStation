/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Service from "../../../../../config/Service";

const AllReceivedRFI = () => {
  const[RFI, setRFI] = useState([]);


  const fetchREceivedRfi = async () => {
    try{
      const rfi = await Service.inboxRFI();
      console.log(rfi);
      if(rfi){
        setRFI(rfi.data);
      }else{
        console.log("RFI not found");
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchREceivedRfi();
  },[])
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
                <th className="px-2 py-1">Mail ID</th>
                <th className="px-2 py-1">Subject/Remarks</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">RFI Status</th>
                <th className="px-2 py-1">RFI Forward</th>
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {RFI?.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan="9" className="text-center">
                    No received RFI Found
                  </td>
                </tr>
              ) : (
                RFI?.map((project) => (
                  <tr
                    key={project?.id}
                    className="hover:bg-blue-gray-100 border"
                  >
                     <td className="border px-2 py-1 text-left">
                      {project?.fabricator || "N/A"}
                    </td>
                    <td className="border px-2 py-1 text-left">
                      {project?.client?.name || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {project?.project || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {project?.mail || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {project?.remarks || "No remarks"}
                    </td>
                    <td className="border px-2 py-1">
                      {project?.date || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {project?.status || "Open"}
                    </td> 
                     <td className="border px-2 py-1">
                      
                      <button className="bg-teal-300 px-2 py-1 rounded">
                        Forward
                      </button>
                    </td>
                    <td className="border px-2 py-1">
                      
                      <button className="bg-blue-300 px-2 py-1 rounded">
                        View
                      </button>
                    </td> 
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
