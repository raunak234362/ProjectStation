/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Service from "../../../../../config/Service";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AddBranch, Button } from "../../../../index";

const GetFabricator = ({ fabricatorId, isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isBranchAdd, setIsBranchAdd] = useState(false);
  const [selectedFabricator, setSelectedFabricator] = useState(null);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [fabricator, setFabricator] = useState();

  const fabData = useSelector((state) => state.fabricatorData?.fabricatorData);

  const fetchFabricator = async () => {
    try {
      // Find the fabricator with the matching ID from the Redux store data
      const fabricator = fabData.find((fab) => fab.id === fabricatorId);
      console.log(fabricator);
      if (fabricator) {
        setFabricator(fabricator);
      } else {
        console.log("Fabricator not found");
      }
    } catch (error) {
      console.log("Error fetching fabricator:", error);
    }
    
    // try {
    //   const response = await Service.getFabricator(token, fabricatorId);
    //   //   dispatch(showFabricator(response));
    //   setFabricator(response);
    //   console.log(response);
    // } catch (error) {
    //   console.log("Error fetching fabricator:", error);
    // }
  };

  const handleClose = async () => {
    onClose(true);
  };

  useEffect(() => {
    fetchFabricator();
  }, [fabricatorId]);
  
  const handleAddBranch = async () => {
    setSelectedFabricator(fabricator.id);
    setIsBranchAdd(true);
  };

  const handleAddBranchClose = async () => {
    setSelectedFabricator(null);
    setIsBranchAdd(false);
  };

  const handleEditBranch = async (index) => {
    console.log("Edit Branch", index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[80%] md:p-5 p-2 rounded-lg shadow-lg w-11/12 ">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
          <Button>Edit</Button>
        </div>
        {/* header */}
        <div className="top-2 w-full flex justify-center z-10">
          <div className="mt-2">
            <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
              Fabricator: {fabricator?.name || "Unknown"}
            </div>
          </div>
        </div>

        {/* Container */}
        <div className="p-1 h-[88%] overflow-y-auto rounded-lg shadow-lg">
          <div className="bg-gray-100/50 rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4">Fabricator Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Website",
                  value: fabricator?.website ? (
                    <a
                      href={fabricator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {fabricator.website}
                    </a>
                  ) : (
                    "Not available"
                  ),
                },
                {
                  label: "Drive",
                  value: fabricator?.drive ? (
                    <a
                      href={fabricator.drive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {fabricator.drive}
                    </a>
                  ) : (
                    "Not available"
                  ),
                },
                {
                  label: "Files",
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-medium text-gray-700">{label}:</span>
                  <span className="text-gray-600">
                    {value || "Not available"}
                  </span>
                </div>
              ))}
            </div>

            {/* Head Office */}
            <div className="bg-gray-100 mt-5 rounded-lg shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4">
                Head Office Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Address", value: fabricator?.headquater?.address },
                  { label: "City", value: fabricator?.headquater?.city },
                  { label: "State", value: fabricator?.headquater?.state },
                  { label: "Country", value: fabricator?.headquater?.country },
                  { label: "Zipcode", value: fabricator?.headquater?.zip_code },
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
          {/* Branch Details */}
          {fabricator?.branch?.length >= 0 && (
            <div className="mt-4">
              <div className="flex flex-row justify-between">
                <h2 className="text-lg font-semibold mb-4">Branch Details</h2>
                <Button onClick={handleAddBranch}>Add Branch</Button>
              </div>
              {fabricator.branch.map((branch, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg shadow-md p-5 mt-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Address", value: branch?.address },
                      { label: "City", value: branch?.city },
                      { label: "State", value: branch?.state },
                      { label: "Country", value: branch?.country },
                      { label: "Zipcode", value: branch?.zip_code },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col">
                        <span className="font-medium text-gray-700">
                          {label}:
                        </span>
                        <span className="text-gray-600">
                          {value || "Not available"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={() => handleEditBranch(index)}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedFabricator && (
        <AddBranch
          fabricatorId={selectedFabricator}
          isBranch={isBranchAdd}
          onBranchClose={handleAddBranchClose}
        />
      )}
    </div>
  );
};

export default GetFabricator;
