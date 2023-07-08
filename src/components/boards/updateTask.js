import {useState,useEffect} from 'react'

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {AiFillCloseCircle} from "react-icons/ai"
import {useParams} from "react-router-dom";

function UpdateModel({_id,reload, allTasks,index,allcards,setModal,setShowModal,Maintitle,Maindescription,Maindependency,Maindeadline,Mainpriority,Mainassigned}) {

  const {id} = useParams();
  let[showteam,setShowTeam]=useState("");


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


  useEffect(()=>{
    allTeam()
        },[])  


  const [title, setTitle] = useState(Maintitle);
  const [description, setDescription] = useState(Maindescription);
  const [deadline, setDeadline] = useState(Maindeadline);
  const [label, setLabel] = useState(Mainpriority);
  const [dependency, setDependency] = useState(Maindependency);
  const [assigned, setAssigned] = useState(Mainassigned);
  
  let navigate = useNavigate();

  async function projectData(e) {

    if (title && description && deadline && label ) {
        
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/updatetask`, {
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
          id:_id,
          index
     }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "success") {
        setShowModal(false)
        console.log("success");
        // reload();
        allTasks();
        setModal(false)

      } else {
        toast.error("Something went wrong");
      }
    }
    else{
      toast.error("Please fill All the fields");
    }
  }

  return (
    <div className='cardinfopc'>
    <div className='div_close'>

      <AiFillCloseCircle className='close_icon' onClick={()=>{setShowModal(false)}}/>
    </div>
              <div className='iopb'>

                <h2 className='text'> Update Task title</h2>
                <input type="text" name='title' value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className='iopb'>

                <h2 className='text'> Update Task description</h2>
                <input type="text" name='title' value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className='iopb'>

<h2 className='text'> Update Task deadline</h2>
<input type="date" name='title' value={deadline}
  onChange={(e) => {
    setDeadline(e.target.value);
  }}
/>
</div>
  




  <div className='iopb'>

<h2 className='text'> Update Task status</h2>
<select name="cars" id="cars"   onChange={(e) => {
                    setLabel(e.target.value);
                  }}>
                    <option value=""></option>
  <option value="10" selected={"10"==label}>Idol</option>
  <option value="5" selected={"5"==label}>Running</option>
  <option value="0" selected={"0"==label}>completed</option>
</select>
</div>

<div className='iopb'>

<h2 className='text'> Update Task dependency</h2>
<select name="cars" id="cars"   onChange={(e) => {
                    setDependency(e.target.value);
                  }}>
                    <option value=""></option>
  {allcards && allcards.map((data)=>{
    if(data==null)
    return;
    return <option value={data?.title} selected={data?.title==dependency}>{data?.title}</option>
  })}
</select>
</div>

<div className='iopb'>

<h2 className='text'>  Update Assigned to</h2>
<select name="cars" id="cars" onChange={(e) => {
                    setAssigned(e.target.value);
                  }}>
                    <option value=""></option>
{showteam && showteam.map((data)=>{
    return <option value={data} selected={data==assigned}>{data}</option>
  })}
</select>
</div>

<div className='project' onClick={projectData}>
            Update Task
        </div>
    </div>
  )
}

export default UpdateModel