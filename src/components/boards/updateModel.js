import {useState,useEffect} from 'react'

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {AiFillCloseCircle} from "react-icons/ai"
import {useParams} from "react-router-dom";

function UpdateModel({setShowModal,_id,reload,index,allcards}) {

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


  const [title, setTitle] = useState(allcards[index].title);
  const [description, setDescription] = useState(allcards[index].description);
  const [deadline, setDeadline] = useState(allcards[index].deadline);
  const [label, setLabel] = useState(allcards[index].label);
  const [dependency, setDependency] = useState(allcards[index]?.dependency);
  console.log("🚀 ~ file: updateModel.js:42 ~ UpdateModel ~ dependency", dependency)
  const [assigned, setAssigned] = useState(allcards[index].assigned);
  
  let navigate = useNavigate();

  async function projectData(e) {

    if (title && description && deadline && label ) {
        
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/updatecard`, {
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
          label,
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
        reload();

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

                <h2> Enter card title</h2>
                <input type="text" name='title' value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className='iopb'>

                <h2> Enter card description</h2>
                <input type="text" name='title' value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className='iopb'>

<h2> Enter deadline</h2>
<input type="date" name='title' value={deadline}
  onChange={(e) => {
    setDeadline(e.target.value);
  }}
/>
</div>
  




  <div className='iopb'>

<h2> Enter status</h2>
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

<h2> Choose task dependency</h2>
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

<h2> Assigned to</h2>
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
            Update Card
        </div>
    </div>
  )
}

export default UpdateModel