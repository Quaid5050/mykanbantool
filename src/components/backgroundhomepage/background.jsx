import "./background.css";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
function Background() {
                    
    let navigate = useNavigate();
  return (
    <div className="background" > 

        <div className="first">
        <h1 className="heading"><b> A Project Management Tool</b></h1>
<p className="para"> Welcome to My kanban tool This tool is basically a project management tool. My kanban tool  helps team members to create projects create boards and cards by their own choices. This tool manage  the workflow visually and provides flexibility by moving cars between boards this tool track and report progress automatically and show on burn down charts. Thanks for 
choosing My kanban tool.This tool dedicated to giving Users the best results posssible.</p>
  <div className="but">
    





<button className="getstarted" onClick={()=>{
    console.log("Working")

    navigate("/signin");
}}>Get Started</button>
</div>

        </div>
        <div className="second">
            <img src="/kanban.jfif"/>
        </div>
    </div>
  )
}

export default Background;