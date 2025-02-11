/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
"use client"

import React, { useId, useState, useRef, useEffect } from "react"
import { Select as SelectOpt, Option } from "@material-tailwind/react"

function Select({ options = [], label, name, className, onChange, ...props }, ref) {
  const id = useId()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredOptions, setFilteredOptions] = useState(options)
  const inputRef = useRef(null)

  const handleChange = (event) => {
    setSearchTerm("")
    if (onChange && typeof onChange === "function") {
      onChange(name, event)
    }
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = options.filter((option) => option && option.label.toLowerCase().includes(term))
    setFilteredOptions(filtered)
  }

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  const highlightMatch = (text, highlight) => {
    if (!highlight.trim()) {
      return text
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200 text-black">
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    )
  }

  return (
    <div className="w-full">
      <SelectOpt
        {...props}
        variant="outlined"
        id={id}
        label={label}
        ref={ref}
        name={name}
        className={`rounded-md bg-white duration-200 w-full ${className}`}
        onChange={handleChange}
        selected={(element) =>
          element && (
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-transparent outline-none"
              placeholder={element.props.children}
            />
          )
        }
      >
        {filteredOptions.map(
          (option) =>
            option && (
              <Option key={option.value} value={option.value} className="text-black">
                {highlightMatch(option.label, searchTerm)}
              </Option>
            ),
        )}
      </SelectOpt>
    </div>
  )
}

export default React.forwardRef(Select)

