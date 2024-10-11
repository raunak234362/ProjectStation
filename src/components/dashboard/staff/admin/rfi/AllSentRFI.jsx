/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'

const AllSentRFI = () => {
    const RFI = useSelector((state) => state?.projectData.rfiData)
    console.log(RFI)
  
    return (
      <div className='bg-white/70 rounded-lg md:w-full w-[90vw]'>
        <div className='mt-5 bg-white h-[50vh]'>
          <table className=' h-fit md:w-full w-[90vw] border-collapse text-center md:text-lg text-xs rounded-xl top-0'>
            <thead>
              <tr className='bg-teal-200/70'>
                
                <th className='px-2 py-1 text-left'>Fabricator Name</th>
                <th className='px-2 py-1 text-left'>Project Name</th>
                <th className='px-2 py-1'>Subject/Remarks</th>
                <th className='px-2 py-1'>Recipients</th>
                <th className='px-2 py-1'>Date</th>
                <th className='px-2 py-1'>RFI Status</th>
                <th className='px-2 py-1'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {RFI.length === 0 ? (
                   <tr className="bg-white">
                   <td colSpan="6" className="text-center">
                     No Projects Found
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
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

export default AllSentRFI