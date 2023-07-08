import {useState,useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import {AiFillCloseCircle,TbKeyboardHide} from "react-icons/ai"

function CardUpdate({setShowModal,id,Maintitle,reload}) {

  const [title, setTitle] = useState(Maintitle);

  async function projectData(e) {
    e.preventDefault();
    if (title) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/updateboard`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          id
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
    <div className='cardinfopb'>
    <div className='div_close'>
<></>
      <AiFillCloseCircle className='close_icon' onClick={()=>{setShowModal(false)}}/>
    </div>
              <div className='iopb'>

                <h2 className='text'> Enter card title</h2>
                <input type="text" name='title' value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
             
  
<div className='project' onClick={projectData}>
            Update Board
        </div>
    </div>
  )
}

export default CardUpdate