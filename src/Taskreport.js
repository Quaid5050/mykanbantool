import React from 'react'
import "./TaskStatusReport.css"
import DonutChart from 'react-donut-chart';
import Navbar from "./components/navbar/navbar";
export default function About() {

    const queryParams = new URLSearchParams(window.location.search)
    const title = queryParams.get("title")
    console.log("🚀 ~ file: Taskreport.js:10 ~ About ~ title:", title)
    const description = queryParams.get("description")
    console.log("🚀 ~ file: Taskreport.js:12 ~ About ~ description:", description)
    const deadline = queryParams.get("deadline")
    console.log("🚀 ~ file: Taskreport.js:14 ~ About ~ deadline:", deadline)
    const dependency = queryParams.get("dependency")
    console.log("🚀 ~ file: Taskreport.js:16 ~ About ~ dependency:", dependency)
    const assigned = queryParams.get("assigned")
    const priority= queryParams.get("priority")
    console.log("🚀 ~ file: Taskreport.js:18 ~ About ~ assigned:", assigned)
    let data=[];
    if(priority=="10"){
        data.push(  {
            label: 'Idol',
            value: 0,
          })
    }else if(priority=="5"){
        data.push(  {
            label: 'Running',
            
          })
    }
    else{
        data.push(  {
            label: 'Completed',
            value: 100,
          })       
    }
  return (
<>
<Navbar/>
<div className='main'>
<div className="container" style={{overflowX:"hidden",minHeight:"100vh"}}>

<div className='box'>
<div className="task-status-report">
      <div className="header">
   <h2  >Title of Task</h2>
        <p style={{fontWeight:"bold",color:"black"}}>{title}</p>
      </div>
      <div className="status" style={{display:"flex",justifyContent:"center",fontFamily:"'Montserrat', sans-serif" ,fontSize:"28px",fontWeight:"bold"}}>
     {priority=="10"? <div className="">Idol</div>:""}
     { priority=="5"?<div className="">Running</div>:""}
      {  priority=="0"?  <div className="">Completed</div>:""}
      
      </div>
      <div className="team-members">
        <h2 >Task Description:</h2>
        <p style={{fontWeight:"bold",fontFamily:"'Montserrat', sans-serif",color:"black",fontFamily:"'Montserrat', sans-serif"}}>{description}</p>
      </div>
      
      <div className="dates">
        <h2 >Deadline</h2>
        <p style={{fontWeight:"bold",color:"black",fontFamily:"'Montserrat', sans-serif"}}>{new Date(deadline).toLocaleDateString() }</p>
      </div>
      <div className="team-members">
        <h2 >Assigned To:</h2>
        <p style={{fontWeight:"bold",color:"black",fontFamily:"'Montserrat', sans-serif"}}>{assigned}</p>
      </div>
      <div className="dependencies">
        <h2>Dependencies:</h2>
        <p style={{fontWeight:"bold",color:"black",fontFamily:"'Montserrat', sans-serif"}}>{dependency}</p>
      </div>
      </div>
      </div>
      <div className='box'>
      
      <DonutChart className='donut-chart-container'  colors={['#f44336', '#e91e63', '#9c27b0']}
      
  data={data}
  
/>;
</div>
   
</div></div>
</>
  )
}
