/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'

const AllProjects = () => {
  const projects = useSelector((state) => state?.projectData.projectData) // Access the projects array

  console.log(projects)
  return (
    <div className='bg-white/70 rounded-lg'>
      <div className='mt-5 bg-white h-[50vh]'>
        <table className='w-full table-auto h-fit border-collapse text-center rounded-xl top-0'>
          <thead>
            <tr className='bg-teal-200/70'>
              <th className='px-2 py-1'>S.No.</th>
              <th className='px-2 py-1 text-left'>Project Name</th>
              <th className='px-2 py-1'>Fabricator Name</th>
              <th className='px-2 py-1'>Project Status</th>
              <th className='px-2 py-1'>Project Start Date</th>
              <th className='px-2 py-1'>Project End Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
                 <tr className="bg-white">
                 <td colSpan="6" className="text-center">
                   No Projects Found
                 </td>
               </tr>
            ):( projects?.map((project,index) => (
                  <tr key={project.id} className='hover:bg-blue-gray-100 border'>
                    <td className='border px-2 py-1'>{index + 1}</td>
                    <td className='border px-2 py-1 text-left'>{project.name}</td>
                    <td className='border px-2 py-1'>{project.fabricator}</td>
                    <td className='border px-2 py-1'>{project.status}</td>
                    <td className='border px-2 py-1'>{project.start_date}</td>
                    <td className='border px-2 py-1'>{project.approval_date}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllProjects
