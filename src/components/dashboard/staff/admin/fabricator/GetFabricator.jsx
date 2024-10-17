/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Service from "../../../../../config/Service";
import { Provider, useDispatch, useSelector } from "react-redux";
import {Button} from '../../../../index'

const GetFabricator = ({ fabricatorId, isOpen, onClose }) => {
  console.log("---------------", fabricatorId);
  const [isEditing, setIsEditing] = useState(false);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [fabricator, setFabricator] = useState();

  const fabData = useSelector((state)=>state.fabricatorData?.fabricatorData)

  console.log(fabData)

  const fetchFabricator = async () => {

  try {
      // Find the fabricator with the matching ID from the Redux store data
      const fabricator = fabData.find((fab) => fab.id === fabricatorId);

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

  const handleClose = async()=>{
    onClose(true)
  }

  useEffect(() => {
    fetchFabricator();
  }, [fabricatorId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white md:p-5 rounded-lg shadow-lg w-11/12 max-w-4xl">
      <div>
        <Button className="bg-red-500" onClick={handleClose}>Close</Button>
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
        <div className="p-5 rounded-lg shadow-lg">
          <div className="bg-gray-100 rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4">Fabricator Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Address", value: fabricator?.address },
                { label: "City", value: fabricator?.city },
                { label: "State", value: fabricator?.state },
                { label: "Country", value: fabricator?.country },
                { label: "Zipcode", value: fabricator?.zip_code },
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

export default GetFabricator;
