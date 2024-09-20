/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoIosCloseCircle } from "react-icons/io"
import { NavLink, Outlet } from "react-router-dom"
import Service from "../../../../../config/Service"
import { useDispatch, useSelector } from "react-redux"
import { addVendor } from "../../../../../store/vendorSlice"

const Vendor = () => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch()
  const vendors = useSelector((state) => state.vendorData.vendorData)

  const fetchAllVendors = async () =>{
    const vendorsData = await Service.allVendor(token)
    dispatch(addVendor(vendorsData))
  }


  const fetchVendorUsers = async() =>{
    const vendorUserData = await Service.allVendorUser(token)
    console.log(vendorUserData)
  }

  useEffect(()=>{
    fetchVendorUsers()
    fetchAllVendors()
  },[])


  console.log(vendors)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full mx-5">
      <div className="flex w-full justify-center items-center">
        <div className="text-3xl font-bold text-white bg-green-500/70 shadow-xl px-5 py-1 mt-2 rounded-lg">
          Vendors
        </div>
      </div>
      <div className="my-5 grid md:grid-cols-3 grid-cols-2 gap-5 ">
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">Total Vendors</div>
          <div className="text-3xl font-bold">10</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
          <div className="font-bold text-xl text-gray-800">No. of Vendors users</div>
          <div className="text-3xl font-bold">20</div>
        </div>
      </div>

      <div className="md:hidden flex justify-end mb-3">
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IoIosCloseCircle /> : <GiHamburgerMenu />}
        </button>
      </div>

      <div
        className={`w-full rounded-lg bg-white/70 ${isMenuOpen ? 'block' : 'hidden'} md:block`}
      >
        <nav className="bg-white rounded-lg drop-shadow-md">
        <ul className="flex flex-wrap sm:flex-row flex-col gap-2 py-3 justify-center sm:justify-start">
            <li className="px-2">
              <NavLink to="add-vendor" className={({ isActive }) => (isActive ? 'bg-teal-300 drop-shadow-lg px-5 py-2 rounded-lg font-semibold' : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white')}>
                Add Vendor
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink to="all-vendors" className={({ isActive }) => (isActive ? 'bg-teal-300 drop-shadow-lg px-5 py-2 rounded-lg font-semibold' : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white')}>
                All Vendors
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink to="add-vendor" className={({ isActive }) => (isActive ? 'bg-teal-300 drop-shadow-lg px-5 py-2 rounded-lg font-semibold' : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white')}>
                Add Vendor User
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink to="all-vendor-user" className={({ isActive }) => (isActive ? 'bg-teal-300 drop-shadow-lg px-5 py-2 rounded-lg font-semibold' : 'hover:bg-teal-200 rounded-lg px-5 py-2 hover:text-white')}>
                All Vendor Users
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  )
}

export default Vendor