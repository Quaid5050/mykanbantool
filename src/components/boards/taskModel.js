import {useState,useEffect} from 'react'

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {AiFillCloseCircle} from "react-icons/ai"
import {useParams} from "react-router-dom";

function CardInfo({setShowModal,_id,reload,allcards, allTasks}) {

  const {id} = useParams();
  let[showteam,setShowTeam]=useState("");
  let[showdependency,setShowDependency]=useState("");

  let allTeam=async ()=>{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getteam/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.stat === "success") {
      console.log(data)
      setShowTeam(data?.project[0]?.teamMembers);
    }  
  }



  let allTask=async ()=>{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/gettask/${_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.stat === "success") {
      console.log(data)
      setShowDependency(data?.tasks);
    }  
  }

  useEffect(()=>{
    allTeam();
    allTask();
        },[])  


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [label, setLabel] = useState("");
  const [dependency, setDependency] = useState("");
  const [assigned, setAssigned] = useState("");
  
  let navigate = useNavigate();

  async function projectData(e) {
    e.preventDefault();
                console.log("🚀 ~ file: cardModel.js:24 ~ projectData ~ assigned", assigned)
                console.log("🚀 ~ file: cardModel.js:24 ~ projectData ~ dependency", dependency)
                console.log("🚀 ~ file: cardModel.js:24 ~ projectData ~ label", label)
                console.log("🚀 ~ file: cardModel.js:24 ~ projectData ~ deadline", deadline)
                console.log("🚀 ~ file: cardModel.js:24 ~ projectData ~ description", description)
                console.log("🚀 ~ file: cardModel.js:24 ~ projectData ~ title", title)

    if (title && description && deadline && label ) {
        
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/createtask`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          deadline,
          priority:label,
          dependency,
          assigned,
          id:_id
     }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "success") {
        setShowModal(false)
        console.log("success");
        allTasks()

      } else {
        toast.error("Something went wrong");
      }
    }
    else{
      toast.error("Please fill All the fields");
    }
  }

  return (
    
    
    <div className='cardinfopc' >
    <div className='div_close'>

      <AiFillCloseCircle className='close_icon' onClick={()=>{setShowModal(false)}}/>
    </div>
    
              <div className='iopb'>

                <h2 className='text'> Enter Task Title</h2>
                <input type="text" name='title' value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className='iopb'>

                <h2 className='text'> Enter Task description</h2>
                <input type="text" name='title' value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className='iopb'>

<h2 className='text'> Enter Task deadline</h2>
<input type="date" name='title' value={deadline}
  onChange={(e) => {
    setDeadline(e.target.value);
  }}
/>
</div>
  




  <div className='iopb'>

<h2 className='text'> Enter Task status</h2>
<select  onChange={(e) => {
                    setLabel(e.target.value);
                  }}>
                    <option value=""></option>
  <option value="10">Idol</option>
  <option value="5">running</option>
  <option value="0">completed</option>
</select>
</div>

<div className='iopb'>

<h2 className='text'> Choose Task Dependency</h2>
<select onChange={(e) => {
                    setDependency(e.target.value);
                  }}>
                    <option value=""></option>
  {showdependency && showdependency.map((data)=>{
    return <option value={data?.title}>{data?.title}</option>
  })}
</select>
</div>

<div className='iopb'>

<h2 className='text'> Assigned to</h2>
<select  onChange={(e) => {
                    setAssigned(e.target.value);
                  }}>
                    <option value=""></option>
{showteam && showteam.map((data)=>{
    return <option value={data}>{data}</option>
  })}
</select>
</div>

<div className='project' onClick={projectData}>
            Create Task
        </div>
    </div>
  )
}

export default CardInfo