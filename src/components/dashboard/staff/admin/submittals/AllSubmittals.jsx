/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import submittals from "./Submittals.jsx";

// Utility function to get nested values safely
const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };
  

const AllSubmittals = () => {
    const Submittals = useSelector((state) => state.projectData?.submittals);

    const [selectedSubmittals, setSelectedSubmittals] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredSubmittals, setFilteredSubmittals] = useState(Submittals);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        fabricator: "",
        project: "",
        status: ""
    });
    const [sortConfig, setSortConfig] = useState({key:"",direction:"asc"});

    const filterAndSort = (data,term, filters)=>{
        let filteredData=data || [];

        if(term){
            filteredData = filteredData.filter(
                (submittals)=>
                    submittals.remarks.toLowerCase().includes(term.toLowerCase()) ||
                    submittals.email.toLowerCase().includes(term.toLowerCase()),
            );
        }

        if(filters.fabricator){
            filteredData = filteredData.filter(
                (submittals)=>
                    submittals.fabricator.toLowerCase()=== filters.fabricator.toLowerCase()
            )
        }

        if(filters.project){
            filteredData= filteredData.filter(
                (submittals)=>
                    submittals?.fabricator?.project?.name?.toLowerCase() === filters.project.toLowerCase() ||
                    submittals?.project?.name?.toLowerCase() === filters.project.toLowerCase()
            )
        }

        if(filters.status){
            filteredData = filteredData.filter(
                (submittals)=>
                    submittals.status.toLowerCase() === filters.status
            )
        }

        // Apply sorting
    if (sortConfig.key) {
        filteredData.sort((a, b) => {
          const aValue = getNestedValue(a, sortConfig.key) || "";
          const bValue = getNestedValue(b, sortConfig.key) || "";
  
          if (typeof aValue === "string" && typeof bValue === "string") {
            return sortConfig.direction === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
  
          if (sortConfig.key === "date") {
            return sortConfig.direction === "asc"
              ? new Date(aValue) - new Date(bValue)
              : new Date(bValue) - new Date(aValue);
          }
  
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        });
      }
      setFilteredSubmittals(filteredData);
    }

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
          direction = "desc";
        }
        setSortConfig({ key, direction });
      };

    useEffect(() => {
        filterAndSort(Submittals,searchTerm,filters)
    }, [Submittals, searchTerm, filters]);

    return (
        <div className='bg-white/70 rounded-lg md:w-full w-[90vw]'>
            <div className="mt-5 h-auto p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-center text-sm md:text-lg rounded-xl">
                        <thead>
                        <tr className='bg-teal-200/70'>

                            <th className='px-2 py-1 text-left'>Fabricator Name</th>
                            <th className='px-2 py-1 text-left'>Project Name</th>
                            <th className='px-2 py-1'>Subject/Remarks</th>
                            <th className='px-2 py-1'>Recipients</th>
                            <th className='px-2 py-1'>Date</th>
                            {/* <th className='px-2 py-1'>RFI Status</th> */}
                            <th className='px-2 py-1'>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* {RFI.length === 0 ? (
                   <tr className="bg-white">
                   <td colSpan="6" className="text-center">
                   No sent RFI Found
                   </td>
                 </tr>
              ):( RFI?.map((project,index) => (
                    <tr key={project.id} className='hover:bg-blue-gray-100 border'>
                      
                      <td className='border px-2 py-1 text-left'>{project.fabricator}</td>
                      <td className='border px-2 py-1'>{project.project}</td>
                      <td className='border px-2 py-1'>{project.remarks}</td>
                      <td className='border px-2 py-1'>{project.recipients}</td>
                      <td className='border px-2 py-1'>10-5-2024</td>
                      <td className='border px-2 py-1'>Open</td>
                      <td className='border px-2 py-1'>Button</td>
                    </tr>
                  ))
              )} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllSubmittals