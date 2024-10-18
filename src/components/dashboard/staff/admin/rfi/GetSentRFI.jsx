/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../../index";

const GetSentRFI = ({ rfiId, isOpen, onClose }) => {
  const [rfi, setRFI] = useState();
  const RFI = useSelector((state) => state?.projectData?.rfiData);

  console.log(rfi);

  const fetchRFI = async () => {
    try {
      const rfi = RFI.find((rfi) => rfi.id === rfiId);
      if (rfi) {
        setRFI(rfi);
      } else {
        console.log("RFI not found");
      }
    } catch (error) {
      console.log("Error fetching RFI:", error);
    }
  };

  const handleClose = async () => {
    onClose(true);
  };

  useEffect(() => {
    fetchRFI();
  }, [rfiId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[80%] md:p-5 rounded-lg shadow-lg w-11/12 max-w-4xl">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>

        {/* header */}
        <div className="top-2 w-full flex justify-center z-10">
          <div className="mt-2">
            <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
              Subject/Remarks: {rfi?.remarks || "Unknown"}
            </div>
          </div>
        </div>

        <div className="p-5 h-[88%] overflow-y-auto rounded-lg shadow-lg">
          <div className="bg-gray-100/50 rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4">Client Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Client Name", value: rfi?.f_name },
                { label: "Email", value: rfi?.email },
                { label: "Fabricator", value: rfi?.fabricator?.name },
                {
                  label: "Branch Address",
                  value: rfi?.fabricator?.branch?.address,
                },
                { label: "Country", value: rfi?.fabricator?.branch?.country },
                { label: "State", value: rfi?.fabricator?.branch?.state },
                { label: "City", value: rfi?.fabricator?.branch?.city },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-medium text-gray-700">{label}:</span>
                  <span className="text-gray-600">
                    {value || "Not available"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-100/50 mt-5 rounded-lg shadow-md p-5">
          <h2 className="text-lg font-semibold mb-4">RFI Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Subject", value: rfi?.remarks },
                { label: "Description", value: rfi?.description },
                { label: "Date", value: rfi?.date },
                { label: "Status", value: rfi?.status },
                { label: "Files", value: rfi?.file },
                
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-medium text-gray-700">{label}:</span>
                  <span className="text-gray-600">
                    {value || "Not available"}
                  </span>
                </div>
              ))}
            </div>


          </div>


        </div>
      </div>
    </div>
  );
};

export default GetSentRFI;