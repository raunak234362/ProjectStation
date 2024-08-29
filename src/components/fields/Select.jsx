/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useId } from "react";
import { Select as SelectOpt, Option } from "@material-tailwind/react";

// eslint-disable-next-line no-unused-vars
function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {/* {label && (
        <label className="mb-1 font-bold text-lg text-black" htmlFor={id}>
          {label}
        </label>
      )} */}
      <SelectOpt
        {...props}
        id={id}
        label={label}
        ref={ref}
        className={`px-3 py-1 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        onChange={props.onChange}
      >
        
        {options?.map((option) => (
          <Option key={option?.value} value={option?.value}>
            {option?.label}
          </Option>
        ))}
      </SelectOpt>
    </div>
  );
}

export default React.forwardRef(Select);