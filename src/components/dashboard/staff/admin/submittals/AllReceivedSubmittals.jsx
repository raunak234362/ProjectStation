/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react';
import Service from '../../../../../config/Service';

const AllReceivedSubmittals = () => {

  const [submittals, setSubmittals] = useState([]);

  useEffect(() => {
    (async() => {
      const response = await Service.reciviedSubmittal();
      setSubmittals(response.data);
    })();
  }, [])


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
              {submittals.length === 0 ? (
                   <tr className="bg-white">
                   <td colSpan="6" className="text-center">
                   No sent RFI Found
                   </td>
                 </tr>
              ):( submittals?.map((project,index) => (
                    <tr key={project.id} className='hover:bg-blue-gray-100 border'>
                      
                      <td className='border px-2 py-1 text-left'>{project.fabricator.fabName}</td>
                      <td className='border px-2 py-1'>{project.project.name}</td>
                      <td className='border px-2 py-1'>{project.subject}</td>
                      <td className='border px-2 py-1'>{project.sender.username}</td>
                      <td className='border px-2 py-1'>{project.date}</td>
                      <td className='border px-2 py-1'>Open</td>
                      <td className='border px-2 py-1'>Button</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
  )
}

export default AllReceivedSubmittals