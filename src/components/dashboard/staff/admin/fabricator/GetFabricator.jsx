/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Service from "../../../../../config/Service";
import { Provider, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import store from "../../../../../store/store";

const GetFabricator = () => {
  const { id } = useParams();
  console.log(id);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [fabricator, setFabricator] = useState();

  const fetchFabricator = async () => {
    try {
      const response = await Service.getFabricator(token, id);
      //   dispatch(showFabricator(response));
      setFabricator(response);
      console.log(response);
    } catch (error) {
      console.log("Error fetching fabricator:", error);
    }
  };

  useEffect(() => {
    fetchFabricator();
  }, [id]);

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gradient-to-r from-green-300/50 to-teal-300">
      {/* header */}
      <div className="fixed top-2 w-full flex justify-center z-10">
        <div className="mt-2">
          <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
            Fabricator: {fabricator?.name || "Unknown"}
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="my-20 mx-5 p-5 rounded-lg bg-white shadow-lg">
        <div className="bg-blue-gray-100 rounded-lg shadow-md p-5">
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
  );
};

export default GetFabricator;
