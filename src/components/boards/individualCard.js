import React, { useState,useEffect,memo } from 'react'
import {AiFillDelete,AiFillEdit} from "react-icons/ai"
import { useNavigate } from 'react-router'
import CardModel from "./cardModel"
import MoveModel from './moveModel'
import UpdateModel from './updateCard'
import TaskModel from "./taskModel"
import IndividualTask from "./individualtask";

function IndividualCard({title ,id ,index,boardId,reload,cardfun}) {

  
    const[showModalUpdate,setShowModalUpdate]=useState(false)
    const[showMoveModal,setMoveShowModal]=useState(false)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [showTasks, setShowTasks] = useState(false);


let deleteCard=async ()=>{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/deletecard`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
             id
     }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "success") {
        cardfun(); 
                 console.log("success");
        
      } else {
        // toast.error("Something went wrong");
      }
}





let allTasks=async ()=>{
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/gettasks/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    credentials: "include",
  });
  const data = await res.json();

  if (data.stat === "success") {
        setShowTasks(data.tasks);
  }  
        console.log("🚀 ~ file: individualCard.js:63 ~ allTasks ~ data.tasks", data.tasks)
}

useEffect(()=>{
  allTasks()
      },[])  


    return (
    <div className='card_ind' style={{marginLeft:"20px"}}>
{/* <div className='icon_outside'> */}

    {/* <div className='icon_inside'>
<AiFillDelete className='icons'onClick={deleteCard}/>
<AiFillEdit className='icons' onClick={()=>{setShowModalUpdate(true)}}/>
</div> */}

<div className='inside_board' style={{padding:"20px"}}>
<div className='title' style={{fontSize:"16px",fontWeight:"bold"}}>{title}</div>
<div className='icon_inside'>
<AiFillDelete className='icons'onClick={deleteCard} />
<AiFillEdit className='icons' onClick={()=>{setShowModalUpdate(true)}} />
</div>
</div>

{showModalUpdate && (
        <UpdateModel setShowModal={setShowModalUpdate} id={id} Maintitle={title} cardfun={cardfun}
        />
      )}



{/* // </div> */}
        {/* <div  className='card_data'><h4>Title</h4> <h4  className='value'>{title}</h4></div> */}
        {/* <div className='card_data'><h4>Description</h4> <h4 className='value'>{description}</h4></div>
        <div className='card_data'><h4>deadline</h4> <h4 className='value'>{deadline}</h4></div>
        <div className='card_data'><h4>label</h4> <h4 className='value'>{label}</h4></div>
        <div className='card_data'><h4>Dependency</h4> <h4 className='value'>{dependency}</h4></div>
        <div className='card_data'><h4>Assigned to</h4> <h4 className='value'>{assigned}</h4></div> */}
<ol>        
        {showTasks.length > 0 && showTasks.map((data,e)=>{
    return <IndividualTask title={data.title}   id={data._id} index={e} data={data}
 setShowModal={setShowModal}  allTasks={allTasks}
 />
})}
</ol>    
        <div>
        <div>



{showModal && (
        <TaskModel setShowModal={setShowModal} _id={id} reload={reload}   allTasks={ allTasks}
        />
      )}
<button className='card_button' style={{marginLeft:"54px",marginBottom:"15px",whiteSpace:"nowrap"}} onClick={()=>{setShowModal(true)}}  >Add Task</button>
</div>


{showMoveModal && (
        <MoveModel setShowModal={setMoveShowModal}  reload={reload} index={index} boardId={boardId}
        />
      )}
{/* <button className='project pop' onClick={()=>{setMoveShowModal(true)}}  >Move Card</button> */}
</div>
    </div>
  )
}

export default memo(IndividualCard)