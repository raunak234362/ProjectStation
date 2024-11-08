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

const AddWB = () => {
  const [rows, setRows] = useState([
    { SNo: "", description: "", qty: "", Executionhours: "", UnitTime: "" },
  ]);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[60%] md:p-5 p-2 rounded-lg shadow-lg md:w-6/12 w-4/5 "></div>
    </div>
  );
};

export default AddWB;
