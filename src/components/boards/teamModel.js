import {useState} from 'react'
import "../proj_create/pop.css"
import { ToastContainer, toast } from "react-toastify";
import {MdOutlineTitle} from "react-icons/md"
import { useNavigate } from 'react-router-dom';
import {MdDescription} from "react-icons/md"
import {AiOutlineUsergroupAdd} from "react-icons/ai"
import {useParams} from "react-router-dom";


import {AiFillCloseCircle} from "react-icons/ai"
function CardInfo({setShowModal}) {


    const {id} = useParams();
    const [member, setMember] = useState("");
  let navigate = useNavigate();




  async function verifyMember(e) {
    e.preventDefault();
    if (member) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/addmember`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          member,
          id
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "success") {
        toast.success("Team Member Added ");

      } else {
        toast.error("Member not registered");
      }
    }
    else{
      toast.error("Please fill the team member field");
    }
  }


  return (
    <div className='cardinfop' style={{minHeight:'200px'}}>
    <div className='div_close'>

      <AiFillCloseCircle className='close_icon' onClick={()=>{setShowModal(false)}}/>
    </div>

              <div className='iop'>

<h2 style={{textAlign:"left",fontFamily:"'Montserrat', sans-serif"}}> Add team members Through Email</h2>


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
    </div>
  )
}

export default CardInfo