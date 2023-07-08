import "./nav.css";
import { ToastContainer } from "react-toastify";
import { useEffect ,useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {RxAvatar} from "react-icons/rx";
export default function Navbar()
{
let [user,setUser]=useState("");
let navigate = useNavigate();

let logout=async ()=>{
    try{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    
    const data = await res.json();
    if(data?.stat=="success"){
    setUser("");
        navigate("/")
}
    }
    catch(err){

    }

  }


let auth=async ()=>{
        try{
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },
          credentials: "include",
        });
        const data = await res.json();
                    //console.log("🚀 ~ file: navbar.jsx:19 ~ auth ~ data", data)
        if(data?.stat=="success"){
        setUser(data?.user)}
        }
        catch(err){

        }

  
      }
  
            useEffect(()=>{
        
  auth()
      },[])


    return(
        <>
           <div className='app_navbar z-50'>
           <div className="logo_icon">  
           <img src="/logo.jpeg" className="icon"/>
      <h4 className="headingnav">My Kanban Tool</h4>
      </div>
      {user && (<div className="second">
      <RxAvatar style={{color:"white"}}/>
<h2>{user?.firstname} </h2>
        <div  onClick={logout} style={{background:"#2c3e50",padding:"10px 20px",borderRadius:"10px",color:"White",fontSize:"15px",fontWeight:"bold",cursor:"pointer"}}>
            Logout
        </div>
      </div>) }
    </div>
  

    <ToastContainer position="top-center"></ToastContainer>
        </>
    );
};
