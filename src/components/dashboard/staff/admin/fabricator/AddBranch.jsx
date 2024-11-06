/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from "../../../../index";

const AddBranch = ({isBranch,onBranchClose}) => {
    const handleClose = async () => {
        onBranchClose(true); 
        console.log("CLoose");
      };
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
         <div className="bg-white h-[80%] md:p-5 p-2 rounded-lg shadow-lg w-11/12 ">
         <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
          {/* <Button>Edit</Button> */}
        </div>
         </div>
    </div>
  )
}

export default AddBranch