import {useState} from 'react'

import Navbar from "./components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import Board from './components/boards';
import TeamModel from "./components/boards/teamModel"
import LineChart from './components/chart2/LineChart';
import {useParams} from "react-router-dom";
import { MdOutlineGroupAdd, MdSettingsSystemDaydream } from 'react-icons/md';

function Main() {
  const {id} = useParams();
  let navigate = useNavigate();
  const [teamM,setTeamM]=useState(false);
  return (
    <div>

    <Navbar/>
 
    <div style={{textAlign:'Right',paddingRight:"10px",background:"#f1c40f"}}>
    {
      teamM?<TeamModel setShowModal={setTeamM}/>:null
    }
  <div style={{display:"flex", justifyContent:"flex-end"}}> 
  <div>
 <button onClick={()=>{navigate(`/projectprogressreport/${id}`)}}  style={{cursor:'pointer',padding:"0px 25px",color:"white",fontWeight:"bold", borderRadius:"12px",marginLeft:"30px",marginTop:"10px"}}>project Progress</button>
 </div>

 <button onClick={()=>{setTeamM(!teamM)}}  style={{cursor:'pointer',padding:"0px 25px",color:"white",fontWeight:"bold", borderRadius:"12px",marginLeft:"30px",marginTop:"10px"}}> <div style={{display:"flex",justifyContent:"center",alignItems:"center",}}> <MdOutlineGroupAdd style={{fontSize:"35px",marginRight:"10px"}}/> Add Member </div></button>


</div> 
 </div>

    <Board/>
 <div className='line_chart'>
  <LineChart/>
 </div>
    </div>
  )
}

export default Main