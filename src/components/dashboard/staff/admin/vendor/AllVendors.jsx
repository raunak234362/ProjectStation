import { useEffect, useState } from "react";
import Service from "../../../../../config/Service";


const AllVendors = () => {
  const token = sessionStorage.getItem("token");
  const [vendors, setVendors] = useState();

  const fetchAllVendors = async () =>{
    const vendorsData = await Service.allVendor(token)
    setVendors(vendorsData)
  }
  console.log(vendors)
  useEffect(()=>{
    fetchAllVendors()
  },[])

  return (
    <div className="bg-white/70 rounded-lg md:w-full w-[90vw]">
    <div className="mt-5 bg-white h-[50vh]">
      <table className=" h-fit md:w-full w-[90vw] border-collapse text-center md:text-lg text-xs rounded-xl top-0">
        <thead>
          <tr className="bg-teal-200/70">
            <th className="px-2 py-1 text-left">Vendor Name</th>
            <th className="px-2 py-1">City</th>
            <th className="px-2 py-1">State</th>
            <th className="px-2 py-1">Country</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors?.length === 0 ? (
            <tr className="bg-white">
              <td colSpan="6" className="text-center">
                No Client Found
              </td>
            </tr>
          ) : (
            vendors?.map((vendor) => (
              <tr
                key={vendor.id}
                className="hover:bg-blue-gray-100 border"
              >
                <td className="border px-2 py-1 text-left">
                  {vendor.f_name} {vendor.m_name} {vendor.l_name} 
                </td>
                <td className="border px-2 py-1">{vendor.city}</td>
                <td className="border px-2 py-1">{vendor.state}</td>
                <td className="border px-2 py-1">{vendor.country}</td>
                <td className="border px-2 py-1">Button</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default AllVendors