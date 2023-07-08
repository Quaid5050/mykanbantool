import React, { useState ,useEffect} from 'react'
import DonutChart from 'react-donut-chart';
import "./TaskStatusReport.css"
import {useParams} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
export default function() {

  const {id} = useParams();

  
    const [project,setProject]=useState("")
    const [total,setTotal]=useState(0)
    const [completed,setCompleted]=useState(0)
    const queryParams = new URLSearchParams(window.location.search)
    const temp = queryParams.get("total")
    console.log("🚀 ~ file: employeereport.js:16 ~ function ~ temp:", temp)
    const cemp = queryParams.get("com")


  let allData=async ()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getemployeedata/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
      });
      const data = await res.json();

      console.log("🚀 ~ file: employeereport.js:23 ~ allData ~ data:", data)
  
      if (data.stat === "success") {
      setProject(data?.user);
      }

      setTotal(temp);
      setCompleted(cemp)
        
    }

    useEffect(()=>{
      allData()
          },[])  
console.log("printing ",completed)
  return (
    <>
    <div className='color'>
    <Navbar/>
    <div className='row'>
    <h2 className='head'>Employee Progress Report</h2>
    <div className='column'>
    
<div className="project-progress-report">
      
      <p>Employe First Name: {project?.firstname}</p>
      <p>Employe Last Name: {project?.lastname}</p>
      <p> Employee Email: {project?.email}</p>
      <p> Employee Phone: {project?.phone}</p>
      <p>Total Tasks: {total}</p>
      <p>Tasks Completed: {completed}</p>
      {/* <p>Start Date: {new Date()}</p> */}
      <p>Project Progress: {completed *100 / total}</p>
    </div> 
    </div>
    <div className='column'>
    <DonutChart className='donut-chart-container' height={500} width={500}      
      data={[ {
            label: 'Remaining',
            value:  parseInt(total-completed),
          },{
            label: 'Completed',
            value: parseInt(completed),
          }]}
    />;
    </div>
</div>    
</div>    </>
  )
}
