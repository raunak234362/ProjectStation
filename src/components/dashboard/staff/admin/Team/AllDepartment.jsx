import { useEffect, useState } from "react"
import Service from "../../../../../config/Service"


const AllDepartment = () => {
    const [department, setDepartment] = useState()
    const token = sessionStorage.getItem("token")

    const departmentsData = async() =>{
        const departmentData = await Service.allDepartment(token)
        setDepartment(departmentData)
    } 

    useEffect(()=>{
        departmentsData()
    },[])

    console.log(department)

  return (
    <div>AllDepartment</div>
  )
}

export default AllDepartment