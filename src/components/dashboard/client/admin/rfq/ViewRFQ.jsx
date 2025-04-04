import React from 'react'
import Button from '../../../../fields/Button'



const ViewRFQ = () => {
  return (
    <>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="p-5 bg-white rounded-lg shadow-lg w-[50%] h-[50%] items-center">
          <Button className="bg-red-500 top-2 right-2">Close</Button>
          <div className="m-6 p-5 bg-gray-50  rounded-lg shadow-lg w-[95%] h-[90%] flex flex-col">
            <div className="px-3 py-2 mt-3 font-bold text-white bg-teal-400 rounded-lg shadow-md md:px-4 md:text-2xl">
              RFQ Details
            </div>
            <div className="">
              <h1 className="p-3 font-bold">RFQ Information</h1>
              <div className="grid grid-cols-2 gap-4 p-5 font-bold rounded-lg shadow-lg bg-gray-50">
                <div>Subject: Rfq testing</div>
                <div>Description: Rfq testing discription</div>
                <div>Date: 2025-03-05T06:26:55.965Z</div>
                <div>Files: Not available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewRFQ