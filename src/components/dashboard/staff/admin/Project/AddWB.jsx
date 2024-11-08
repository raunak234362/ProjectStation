/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Button,
  Toggle,
  MultipleFileUpload,
} from "../../../../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const AddWB = ({ projectId, onClose }) => {
  const [project, setProject] = useState([]);
  const projectData = useSelector((state) => state?.projectData.projectData);
  const [rows, setRows] = useState([
    { SNo: "", description: "", qty: "", Executionhours: "", UnitTime: "" },
  ]);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchProject = async () => {
    try {
      const project = projectData.find((project) => project.id === projectId);

      if (project) {
        setProject(project);
      } else {
        console.log("Project not found");
      }
    } catch (error) {
      console.log("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  // Update a specific row
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  // Add a new row
  const addRow = () => {
    setRows([
      ...rows,
      { SNo: "", description: "", qty: "", Executionhours: "", UnitTime: "" },
    ]);
  };

  const handleClose = async () => {
    onClose(true);
    console.log("CLoose");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[60%] md:p-5 p-2 rounded-lg shadow-lg md:w-5/6 w-4/5 ">
        <div className="flex flex-row justify-between">
          <Button className="bg-red-500" onClick={handleClose}>
            Close
          </Button>
        </div>
        <div className="top-2 w-full flex justify-center z-10">
          <div className="mt-2">
            <div className="bg-teal-400 text-white px-3 md:px-4 py-2 md:text-2xl font-bold rounded-lg shadow-md">
              Work-Break Down Structure
            </div>
          </div>
        </div>

        <div className="overflow-x-auto md:w-[80vw] w-[75vw] my-3">
          <table className="w-full border-collapse border border-gray-600 text-center text-sm ">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-600 px-2 py-1">Sl.No</th>
                <th className="border border-gray-600 px-2 py-1">
                  Description of WBS
                </th>
                <th className="border border-gray-600 px-2 py-1">Qty. (No.)</th>

                <th className="border border-gray-600 px-2 py-1">
                  Exection Time(Hr)
                </th>
                <br />
                <th className="border border-gray-600 px-2 py-1">Sl.No</th>
                <th className="border border-gray-600 px-2 py-1">
                  Description of WBS
                </th>
                <th className="border border-gray-600 px-2 py-1">Qty. (No.)</th>

                <th className="border border-gray-600 px-2 py-1">
                  Checking Time(Hr)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" bg-green-100">
                <td className="border border-gray-600 px-2 py-1">
                  <b>JS</b>
                </td>
                <td className="border border-gray-600 px-2 py-1">
                  <b>Job Study</b>
                </td>
                <td className="border border-gray-600 px-2 py-1"></td>
                <td className="border border-gray-600 px-2 py-1"></td>

                <td className="border border-gray-600 px-2 py-1"></td>

                <td className="border border-gray-600 px-2 py-1"></td>
                <td className="border border-gray-600 px-2 py-1"></td>

                <td className="border border-gray-600 px-2 py-1"></td>
                <td className="border border-gray-600 px-2 py-1"></td>
              </tr>
            </tbody>
            <tbody>
              {[
                {
                  SNo: "JM",
                  desc: "Job Study - Modelling",
                  SNoCheck: "JC",
                  descCheck: "Job Study - Model Checking",
                },
                {
                  SNo: "JE",
                  desc: "Job Study - Erection",
                  SNoCheck: "JC",
                  descCheck: "Job Study - Erection Checking",
                },
                {
                  SNo: "JD",
                  desc: "Job Study - Detailing",
                  SNoCheck: "JC",
                  descCheck: "Job Study - Detailing Checking",
                },
              ].map((item, idx) => (
                <tr
                  key={idx}
                  className={`bg-green-100 ${idx % 2 === 0 ? "" : "/30"}`}
                >
                  <td className="border border-gray-600 px-2 py-1">
                    {item.SNo}
                  </td>
                  <td className="border border-gray-600 px-2 py-1">
                    {item.desc}
                  </td>
                  <td className="border border-gray-600 px-2 py-1"></td>
                  <td className="border border-gray-600 px-2 py-1"></td>
                  <br />
                  <td className="border border-gray-600 px-2 py-1">
                    {item.SNoCheck}
                  </td>
                  <td className="border border-gray-600 px-2 py-1">
                    {item.descCheck}
                  </td>
                  <td className="border border-gray-600 px-2 py-1"></td>
                  <td className="border border-gray-600 px-2 py-1"></td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {[
                {
                  desc: "Modelling",
                  SNoCheck: "JC",
                  descCheck: "Job Study - Model Checking",
                }
              ].map((item, idx) => (
                <tr
                  key={idx}
                  className={`bg-green-100 ${idx % 2 === 0 ? "" : "/30"}`}
                >
                  <td className="border border-gray-600 px-2 py-1">
                    {item.SNo}
                  </td>
                  <td className="border border-gray-600 px-2 py-1">
                    <b>{item.desc}</b>
                  </td>
                  <td className="border border-gray-600 px-2 py-1"></td>
                  <td className="border border-gray-600 px-2 py-1"></td>
                  <br />
                  <td className="border border-gray-600 px-2 py-1">
                    {item.SNoCheck}
                  </td>
                  <td className="border border-gray-600 px-2 py-1">
                    {item.descCheck}
                  </td>
                  <td className="border border-gray-600 px-2 py-1"></td>
                  <td className="border border-gray-600 px-2 py-1"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddWB;
