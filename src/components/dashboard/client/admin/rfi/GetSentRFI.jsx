/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, MultipleFileUpload } from "../../../../index";
import Service from "../../../../../config/Service";
import { useForm } from "react-hook-form";

const GetSentRFI = ({ rfiId, isOpen, onClose }) => {
  const [rfi, setRFI] = useState();
  const RFI = useSelector((state) => state?.projectData?.rfiData);
const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [files, setFiles] = useState([]);
  const fetchReceivedRfi = async () => {
    try {
      const rfi = await Service.fetchRFIById(rfiId);
      console.log(rfi);
      if (rfi) {
        setRFI(rfi.data);
      } else {
        console.log("RFI not found");
      }
    } catch (error) {
      console.log(error);
    }
  }


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

  const onFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };


  useEffect(() => {
    fetchReceivedRfi();
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
              Subject/Remarks: {rfi?.subject || "Unknown"}
            </div>
          </div>
        </div>

        <div className="p-5 h-[88%] overflow-y-auto rounded-lg shadow-lg">
          <div className="bg-gray-100/50 mt-5 rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4">RFI Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Subject", value: rfi?.subject },
                { label: "Description", value: rfi?.description },
                { label: "Date", value: rfi?.date ? new Date(rfi?.date).toDateString() : "Not available" },
                // { label: "Status", value: rfi?.status === "seen" ? "Seen" : "Not Seen" },
                {
                  label: "Files",
                  value: Array.isArray(rfi?.files)
                    ? rfi?.files?.map((file, index) => (
                      <a
                        key={index}
                        href={`${import.meta.env.VITE_BASE_URL
                          }/api/RFI/rfi/${rfi.id}/${file.id}`} // Use the file path with baseURL
                        target="_blank" // Open in a new tab
                        rel="noopener noreferrer"
                        className="px-5 py-2 text-teal-500 hover:underline"
                      >
                        {file.originalName || `File ${index + 1}`}
                      </a>
                    ))
                    : "Not available",
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
          <div className="bg-gray-100/50 mt-5 rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4">Respond to RFI</h2>
            <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Details:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <Input
                label="Subject/Remarks:"
                placeholder="Subject/Remarks"
                size="lg"
                color="blue"
                {...register("subject")}
              />
            </div>
            <div className="w-full my-3">
              <Input
                type="textarea"
                label="Description:"
                placeholder="Description"
                size="lg"
                color="blue"
                {...register("description")}
              />
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Attach Files:
          </div>
          <div className="my-2 md:px-2 px-1">
            <MultipleFileUpload
              label="Select Files"
              onFilesChange={onFilesChange}
              files={files}
              accept="image/*,application/pdf,.doc,.docx"
              {...register("files")}
            />
          </div>

          <div className="my-5 w-full">
            <Button type="submit">Send Message</Button>
          </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default GetSentRFI;
