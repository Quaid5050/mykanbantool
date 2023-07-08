import {useState} from 'react'
import "./pop.css"
import { ToastContainer, toast } from "react-toastify";
import {MdOutlineTitle} from "react-icons/md"
import { useNavigate } from 'react-router-dom';
import {MdDescription} from "react-icons/md"
import {AiOutlineUsergroupAdd} from "react-icons/ai"

import {AiFillCloseCircle} from "react-icons/ai"
function CardInfo({setShowModal}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [member, setMember] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  let navigate = useNavigate();

  async function projectData(e) {
    e.preventDefault();
    if (title && description && teamMembers) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/createproject`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          title,description,teamMembers
     }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "success") {
        navigate(`/main/${data?.project?._id}`)
      } else {
        toast.error("Something went wrong");
      }
    }
    else{
      toast.error("Please fill All the fields");
    }
  }






  async function verifyMember(e) {
    e.preventDefault();
    if (member) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/verifymember`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          member,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "success") {
         setTeamMembers((pre)=>{return pre.indexOf(member) === -1 ? [...pre,member] :[...pre];});
      } else {
        toast.error("Member not registered");
      }
    }
    else{
      toast.error("Please fill the team member field");
    }
  }


  return (
    <div className='cardinfop'>
    <div className='div_close'>

      <AiFillCloseCircle className='close_icon' onClick={()=>{setShowModal(false)}}/>
    </div>
              <div className='iop'>

              <h2  className='text'> Enter project title</h2>


              <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"-20px"}}>

              <MdOutlineTitle style={{color:"white"}}/>
                <input type="text" name='title' value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                </div>
              </div>
              <div className='iop'>
                <h2 className='text'> Enter project description</h2>

                <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"-20px"}}>
                
                <MdDescription style={{color:"white"}}/>
                <input type="text" name='description'
                 value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                </div>
              </div>
              <div className='iop'>

<h2 className='text'> Add team members Through Email</h2>


<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"-20px"}}>
<AiOutlineUsergroupAdd style={{color:"white"}}/>
<input type="text" name='member'
  value={member}
  onChange={(e) => {
        setMember(e.target.value);
          }}
/></div>
<div className='add'>
<div className='project ' onClick={verifyMember}>
            Add
        </div>
        </div>
</div>
  <div className='iop'>
  <ol className='member'>
{teamMembers && teamMembers.map((data,e)=>{
return <li key={e}>{data}</li>
})}
</ol>
</div>
<div className='project' onClick={projectData}>
            Create Project
        </div>
    </div>
  )
}

export default CardInfo