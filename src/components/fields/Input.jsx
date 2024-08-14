/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useId } from 'react'

function Input(
  { label, type = 'text', className, placeholder, ...props },
  ref,
) {
  const id = useId()
  return (
    <div className="w-full grid md:grid-cols-[20%,80%] items-center">
      {label && (
        <label className="mb-1 font-bold text-lg text-black" htmlFor={id}>
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <>
          <textarea
            className={` px-3 py-1 w-full rounded-lg bg-white text-gray-700 border-2 border-gray-300 focus:border-gray-600 focus:bg-slate-300 focus:bg-opacity-60 duration-200 ${className}`}
            ref={ref}
            placeholder={placeholder}
            {...props}
            id={id}
          ></textarea>
        </>
      ) : (
        <input
          type={type}
          className={` px-3 py-1 w-full rounded-lg bg-white text-gray-700 border-2 border-gray-300 focus:border-gray-600 focus:bg-slate-300 focus:bg-opacity-60 duration-200 ${className}`}
          ref={ref}
          placeholder={placeholder}
          {...props}
          id={id}
        />
      )}
    </div>
  )
}

export default React.forwardRef(Input)
