import {useState,useEffect} from 'react'

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {AiFillCloseCircle} from "react-icons/ai"
import {useParams} from "react-router-dom";

function MoveModel({setShowModal,reload,index,boardId}) {

  const [title, setTitle] = useState("");
  const {id} = useParams();

  let[showBoards,setShowBoards]=useState("");

  let[Board,setBoard]=useState("");

  let allBoards=async ()=>{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getboards/${id}`, {
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
      setShowBoards(data.boards);
    }  
  }


  useEffect(()=>{
    allBoards()
        },[])  

  async function moveBoard(e) {
    console.log("cllaed")
    e.preventDefault();
    if (Board) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/moveboard`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            boardId,
          id:Board,
          index
     }),
      });

      const data = await res.json();
      if (data.stat === "success") {
        setShowModal(false)
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

      <AiFillCloseCircle className='close_icon' onClick={()=>{setShowModal(false)}}/>
    </div>
    <div className='iopb'>

<h2>  Select Board</h2>
<select name="cars" id="cars" onChange={(e) => {
                    setBoard(e.target.value);
                  }}>
                    <option value=""></option>
{showBoards && showBoards.map((data)=>{
    return <option value={data._id}>{data?.title}</option>
  })}
</select>
</div>

             
  
<div className='project' onClick={moveBoard}>
            Move
        </div>
    </div>
  )
}

export default MoveModel