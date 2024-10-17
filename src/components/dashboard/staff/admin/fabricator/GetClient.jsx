/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import{Button} from '../../../../index'

const GetClient = ({ clientId, isOpen, onClose }) => {
  const [client, setClient] = React.useState();
  const clData = useSelector((state) => state.fabricatorData?.clientData);

  const fetchClient = async () => {
    try {
      const client = clData.find((cl) => cl.id === clientId);
      console.log(client)
      if (client) {
        setClient(client);
      } else {
        console.log("Client not found");
      }
    } catch (error) {
      console.log("Error fetching client:", error);
    }
  };

  const handleClose = async () => {
    onClose(true);
  };

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white md:p-5 rounded-lg shadow-lg w-11/12 max-w-4xl">
        <div>
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>
        {/* header */}
        <div className="top-2 w-full flex justify-center z-10">
          <div className="mt-2">
            <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
              Fabricator: {client?.fabricator?.name || "Unknown"}
            </div>
          </div>
        </div>

        {/* Container */}
        <div className="p-5 rounded-lg shadow-lg">
          <div className="bg-gray-100 rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4">Client Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Name", value: client?.f_name },
                { label: "City", value: client?.fabricator?.address },
                { label: "City", value: client?.fabricator?.city },
                { label: "State", value: client?.fabricator?.state },
                { label: "Country", value: client?.fabricator?.country },
                { label: "Zipcode", value: client?.fabricator?.zip_code },
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

export default GetClient;
