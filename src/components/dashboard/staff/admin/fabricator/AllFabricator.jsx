import { useSelector } from "react-redux"


const AllFabricator = () => {
const fabricators = useSelector((state) => state?.fabricatorData.fabricatorData)
console.log(fabricators)

  return (
    <div className='bg-white/70 rounded-lg md:w-full w-[90vw]'>
    <div className='mt-5 bg-white h-[50vh]'>
      <table className=' h-fit md:w-full w-[90vw] border-collapse text-center md:text-lg text-xs rounded-xl top-0'>
        <thead>
          <tr className='bg-teal-200/70'>
            
            <th className='px-2 py-1 text-left'>Fabricator Name</th>
            <th className='px-2 py-1'>City</th>
            <th className='px-2 py-1'>State</th>
            <th className='px-2 py-1'>Country</th>
            <th className='px-2 py-1'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fabricators.length === 0 ? (
               <tr className="bg-white">
               <td colSpan="6" className="text-center">
                 No Projects Found
               </td>
             </tr>
          ):( fabricators?.map((fabricator) => (
                <tr key={fabricator.id} className='hover:bg-blue-gray-100 border'>
                  
                  <td className='border px-2 py-1 text-left'>{fabricator.name}</td>
                  <td className='border px-2 py-1'>{fabricator.city}</td>
                  <td className='border px-2 py-1'>{fabricator.state}</td>
                  <td className='border px-2 py-1'>{fabricator.country}</td>
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

export default AllFabricator