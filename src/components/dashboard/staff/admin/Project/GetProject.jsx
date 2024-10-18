/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Service from "../../../../../config/Service";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../index";


const GetProject = ({projectId, onClose}) => {

    const[project,setProject]=useState();

    const projectData = useSelector((state) => state?.projectData.projectData);

    const fetchProject = async()=>{
        try{
            const project = projectData.find((project)=> project.id === projectId);

            if(project){
                setProject(project);
            }else{
                console.log("Project not found");
            }
        }catch(error){
            console.log("Error fetching project:", error);
        }
    }

    const handleClose = async () => {
        onClose(true);
      };

    useEffect(() => {
        fetchProject();
    },[projectId])

  return (
    <div>GetProject</div>
  )
}

export default GetProject