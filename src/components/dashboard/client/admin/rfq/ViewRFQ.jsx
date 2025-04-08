import React, { useState } from "react";
import Button from "../../../../fields/Button";

const ViewRFQ = ({data,onClose, isOpen}) => {
  const rfqDetails = data;
  console.log("rfqDetails", data);
  const [click, setClick] = useState(false);
  const [rfq, setRfq] = useState(rfqDetails);
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  const handleModalClose = () => {
      onClose(false);
   };
  
  

  return (
    <>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="p-5 bg-white rounded-lg shadow-lg w-[50%] h-[50%] items-center">
          <Button
            className="bg-red-500 top-2 right-2"
            onClick={handleModalClose}
          >
            Close
          </Button>
          <div className="m-6 p-5 bg-gray-50  rounded-lg shadow-lg w-[95%] h-[90%] flex flex-col">
            <div className="px-3 py-2 mt-3 font-bold text-white bg-teal-400 rounded-lg shadow-md md:px-4 md:text-2xl">
              RFQ Details
            </div>
            <div className="">
              <h1 className="p-3 font-bold">RFQ Information</h1>
              <div className="p-5 font-bold rounded-lg shadow-lg bg-gray-50">
                <div>
                  Subject:
                  <span className="pl-5 font-medium text-gray-800">
                    {rfqDetails?.subject}
                  </span>
                </div>
                <div>
                  Description:
                  <span className="pl-5 font-medium text-right text-gray-800">
                    {rfqDetails?.description}
                  </span>
                </div>
                <div>
                  Date:{" "}
                  <span className="pl-5 font-medium text-gray-800">
                    {rfqDetails?.date}
                  </span>
                </div>
                <div>
                  Files:{" "}
                  <span className="pl-5 font-medium text-gray-800"></span>
                  {/* {rfqDetails?.files} */}
                  {rfqDetails?.files?.map((file, index) => (
                    <span
                      key={index}
                      className="pl-5 font-medium text-gray-800"
                    >
                      <a
                        href={`${import.meta.env.VITE_BASE_URL}/api/RFQ/rfq/${
                          rfqDetails.id
                        }/${file.id}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        {file.originalName || "Null"}
                      </a>
                    </span>
                  ))}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRFQ;
