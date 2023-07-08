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
   
  let allData=async ()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getprojectdata/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
      });
      const data = await res.json();
  
      if (data.stat === "success") {
      setProject(data?.project);
     let tot=0;
     let com=0;
      data?.tasks.map((data)=>{
     tot++;
        if(data.priority=="0"){
            com++;
     }
      })

      setTotal(tot);
      setCompleted(com)
      }  
    }

    useEffect(()=>{
      allData()
          },[])  

  return (
    <>
    <div className='color'>
    <Navbar/>
    <div className='row'>
    <h2 className='head'>Project Progress Report</h2>
    <div className='column'>
    
<div className="project-progress-report">
      
      <p>Project Name: {project?.title}</p>
      <p>Project Description: {project?.description}</p>
      <p>Project Employees: {project?.teamMembers?.map((data)=>{return <ul>{data}</ul>})}</p>
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
            value: total-completed,
          },{
            label: 'Completed',
            value: completed,
          }]}
    />;
    </div>
    
</div>    
</div>    </>
  )
}
