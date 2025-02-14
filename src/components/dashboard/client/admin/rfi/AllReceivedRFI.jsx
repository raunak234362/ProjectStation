/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
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
                RFI?.map((rfi) => (
                  <tr
                    key={rfi?.id}
                    className="hover:bg-blue-gray-100 border"
                  >
                    <td className="border px-2 py-1 text-left">
                      {rfi?.fabricator.fabName || "N/A"}
                    </td>
                    <td className="border px-2 py-1 text-left">
                      {rfi?.recepients?.username || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {rfi?.project.name || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {rfi?.recepients.email|| "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {rfi?.subject || "No remarks"}
                    </td>
                    <td className="border px-2 py-1">
                      {rfi?.date || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {rfi?.status? "No Reply"  : "Replied"}
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
