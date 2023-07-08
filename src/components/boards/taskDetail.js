import {useState,useEffect,memo} from 'react'
import { useNavigate } from "react-router-dom";
import {AiFillCloseCircle} from "react-icons/ai"
import UpdateTask from "./updateTask";

function TaskInfo({data,setShowModal,title,description,dependency,deadline,priority,assigned,id, allTasks}) {

  let navigate = useNavigate();
const [updateModalShow,setUpdateModalShow]=useState(false);

  let deletTask=async ()=>{

    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/deletetask`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          id,
     }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "success") {
        // reload()
        setShowModal(false);
        allTasks();
        // console.log("success");
        
      } else {
        // toast.error("Something went wrong");
      }
}

  return (
    // <div>ddd</div>
    <>
    <div className='cardinfopc' style={{overflow:"hidden",height:"80vh"}}>
    <div className='div_close'>

      <AiFillCloseCircle className='close_icon' onClick={()=>{setShowModal(false)}}/>
    </div>
              <div className='iopb'>

                <h2 className='text'> Task Title</h2>
                    <h2 className='text'>{title}</h2>
              </div>

              <div className='iopb'>

                <h2 className='text'> Task Description</h2>
                 
                <h2 className='text'>    {description}</h2>
              </div>
              <div className='iopb'>

<h2 className='text'> Deadline</h2>
{new Date(deadline).toLocaleDateString()}
</div>
  




  <div className='iopb'>

<h2 className='text'> Status</h2>
{
  priority=="0"?"Completed":null
}
{
  priority=="5"?"Running":null
}
{
  priority=="10"?"Idol":null
}
</div>

<div className='iopb'>

<h2 className='text'> Task dependency</h2>
{dependency}
</div>

<div className='iopb'>

<h2 className='text'> Assigned to</h2>
{assigned}
</div>
<div className='iopb' >
<button onClick={deletTask} style={{padding:"10px 25px",background:"#f39c12",color:"white",borderRadius:"12px",marginRight:"10px"}}>Delete</button>
<button onClick={()=>{setUpdateModalShow(true);}} style={{padding:"10px 25px",background:"#f39c12",color:"white",borderRadius:"12px",marginRight:"10px"}}>Update</button>
<button onClick={()=>{navigate(`/taskreport?title=${title}&description=${description}&deadline=${deadline}&priority=${priority}&assigned=${assigned}&dependency=${dependency}`)}} style={{padding:"10px 25px",background:"#f39c12",color:"white",borderRadius:"12px",marginRight:"10px"}}>Report</button>
</div>
    </div>
{
  updateModalShow && <UpdateTask Maintitle={title} Maindescription={description} 
    Maindeadline={deadline} Mainassigned={assigned} Mainpriority={priority}
    Maindependency={dependency}
     setShowModal={setUpdateModalShow} setModal={setShowModal} _id={id}   allTasks={ allTasks}

     />
}
    </>
  )
}

export default memo(TaskInfo);