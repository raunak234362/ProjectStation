// import { useEffect, useState } from "react";
// import Service from "../../../../../config/Service";
import { useSelector } from "react-redux";

const AllClients = () => {
  // const token = sessionStorage.getItem("token");
  // const [clients, setClients] = useState();
  const clientData = useSelector((state)=>state?.fabricatorData?.clientData)
  // const fetchAllClients = async () =>{
  //   const clientsData = await Service.allClient(token)
  //   setClients(clientsData)
  // }
  // console.log(clients)

  // useEffect(() => {
  //   fetchAllClients()
  // }, [])

  return (
    <div className="bg-white/70 rounded-lg md:w-full w-[90vw]">
      <div className="mt-5 bg-white h-[50vh]">
        <table className=" h-fit md:w-full w-[90vw] border-collapse text-center md:text-lg text-xs rounded-xl top-0">
          <thead>
            <tr className="bg-teal-200/70">
              <th className="px-2 py-1 text-left">Client Name</th>
              <th className="px-2 py-1">City</th>
              <th className="px-2 py-1">State</th>
              <th className="px-2 py-1">Country</th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clientData?.length === 0 ? (
              <tr className="bg-white">
                <td colSpan="6" className="text-center">
                  No Client Found
                </td>
              </tr>
            ) : (
              clientData?.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-blue-gray-100 border"
                >
                  <td className="border px-2 py-1 text-left">
                    {client.f_name} {client.m_name} {client.l_name} 
                  </td>
                  <td className="border px-2 py-1">{client.city}</td>
                  <td className="border px-2 py-1">{client.state}</td>
                  <td className="border px-2 py-1">{client.country}</td>
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

export default AllClients