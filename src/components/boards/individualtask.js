import React, { useState,useEffect,memo } from 'react'
import {AiFillDelete,AiFillEdit} from "react-icons/ai"
import { useNavigate } from 'react-router'
import TaskInfo from './taskDetail'

function IndividualTask({title ,id ,reload,index,data, allTasks}) {
console.log("🚀 ~ file: individualtask.js:6 ~ IndividualTask ~ data", data)

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    return (<>
    <div>
         <div className='title' onClick={()=>setShowModal(true)} style={{border:"1px solid black",margin:"11px",fontSize:"17px", marginTop:"-5px",borderRadius:"5px",paddingLeft:"8px"}}>
 {title}
    </div>

    {showModal && <TaskInfo title={data?.title} description={data?.description} 
    deadline={data?.deadline} assigned={data?.assigned} priority={data?.priority}
    dependency={data?.dependency}
     setShowModal={setShowModal} id={data._id}  allTasks={ allTasks}/>
    }
    </div>
    </>
  )
}

export default memo(IndividualTask)