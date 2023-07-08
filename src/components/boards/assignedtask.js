import {useState,useEffect} from 'react'

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {AiFillCloseCircle} from "react-icons/ai"
import {useParams} from "react-router-dom";

function UpdateModel({_id,allTasks,index,allcards,setModal,setShowModal,Maintitle,Maindescription,Maindependency,Maindeadline,Mainpriority,Mainassigned}) {




  const [title, setTitle] = useState(Maintitle);
  const [description, setDescription] = useState(Maindescription);
  const [deadline, setDeadline] = useState(Maindeadline);
  const [label, setLabel] = useState(Mainpriority);
  const [dependency, setDependency] = useState(Maindependency);
  
  
  
  async function projectData(e) {

    if (label ) {
        
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/updatetaskuser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          
          priority:label,
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

<h2 className='text'>Title</h2>
    <h2 className='text'>{title}</h2>
</div>
 <div className='iopb'>

<h2 className='text'> Description</h2>
    <h2 className='text'>{description}</h2>
</div>
              <div className='iopb'>

              <h2 className='text'> Enter deadline</h2>
{new Date(deadline).toLocaleDateString()}

</div>
  




  <div className='iopb'>

<h2 className='text'> Enter status</h2>
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

<h2 className='text'> Task dependency</h2>
{dependency}
</div>




<div className='project' onClick={projectData}>
            Update Task
        </div>
    </div>
  )
}

export default UpdateModel