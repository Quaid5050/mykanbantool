import React, { useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signincomponent.css";
import {AiOutlineMail} from "react-icons/ai"
import {RiLockPasswordFill} from "react-icons/ri"
const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();

    
    if (email && password) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "wrong" || !data) {
        toast.error("Invalid Credentials");
        
      } else {
        toast.success("Registration Succesfull");
        console.log("Registration Succesfull");
        navigate("/desktop")
      }
    }
    else{
      toast.error("Please fill all the fields");
    }
  }
  return (

    <>
    
      <div className="container1" style={{height:"78.3vh"}}>
        <div className="row">
          <div className="col-left OnlyLogin">
            <div className="buttons">
              
            </div>
            <form action="/login" className="login" method="POST">
              <div className="heading">
              
              </div>
              <div className="form-group1">
              

              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                
              <AiOutlineMail style={{width:"25px"}}/>
                <input
                  type="email"
                  style={{marginLeft:"-2px"}}
                  placeholder="Enter Your email*"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="form-control"
                  name="email"
                  id="email2"
                />
                </div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                
              <RiLockPasswordFill style={{width:"25px"}}/>
                <input
                  type="password"
                  style={{marginLeft:"-2px"}}
                  placeholder="Enter Password*"
                  value={password}
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="form-control"
                  id="password2"
                />
                </div>
              </div>
              <div className="AlreadyAccount">
                {" "}
                <NavLink to="/signup"> Create Account</NavLink>
              </div>
              <div className="buttons">
                <button
                  type="submit"
                  onClick={loginUser}
                  className="sn submitLogin"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  );
};

export default Login;