import React, { useState } from "react";
import {  useNavigate,NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Signin/signincomponent.css"
import {RxAvatar} from "react-icons/rx"
import {signupSchema} from "../../schemas"
import {useFormik} from "formik"
import {BsFillHouseDoorFill} from "react-icons/bs"
import {AiOutlineMail,AiTwotonePhone} from "react-icons/ai"
import {RiLockPasswordFill} from "react-icons/ri"

const initialValues={
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  confirmpassword: "",};
const Registration = () => {

  const {values,errors,handleBlur,touched,handleChange,handleSubmit}= useFormik({
   initialValues:initialValues,
   validationSchema:signupSchema,
   onSubmit:(values)=>{

   } 
  })

  console.log("🚀 ~ file: signupcomp.jsx:29 ~ Registration ~ errors", errors)
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  let name, value;
  function handleinput(e) {
    name = e.target.name;
    value = e.target.value;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function postData(e) {
    e.preventDefault();
    const { firstname, lastname, email, phone, password, confirmpassword } =
      values;

    if (
      firstname &&
      lastname &&
      email &&
      phone &&
      password &&
      confirmpassword
    ) {
      if (password === confirmpassword) {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/registeration`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              firstname,
              lastname,
              email,
              phone,
              password,
            }),
          }
        );

        const data = await res.json();

        if (data.stat === "wrong" || !data) {
          toast.error(data.error);
          console.log("Invalid Registration");
        } else {
          toast.success("Registration successfull");
          console.log("Registration Succesfull");
         
          navigate("/signin")
        }
      } else {
        toast.error("Password and Confirm Password must be same");
      }
    } else {
      toast.error("Please fill  all the fields");
    }
  }

  
  return (
    <>
    
      <div className="container1" style={{height:"78.3vh"}}>
        <div className="row">
          <div className="col-left">
            

            <form method="POST" className="logup" onSubmit={handleSubmit}>
              <div className="heading">
                <h3>Registration Form</h3>
              </div>
              <div className="form-group1" style={{alignItems:"flex-start"}}>
              
              <div className="error_handle">
              <div className="inp">
                <RxAvatar/>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Name"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="firstname"
                  id="firstname"
                  required
                />
                </div>
                {errors.firstname && touched.firstname ?(
                <p style={{color:"red",marginLeft:"25px"}}>{errors.firstname}</p>) :null}

                </div>


                
              <div className="error_handle">
              <div className="inp">
                <BsFillHouseDoorFill style={{marginLeft:"10px"}}/>
                <input
                  type="text"
                  placeholder="Company Name"
                  autoComplete="off"
                  className="form-control"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="lastname"
                  id="lastname"
                  required
                />
                </div>
                {errors.lastname && touched.lastname ?(
                <p style={{color:"red",marginLeft:"30px"}}>{errors.lastname}</p>) :null}
                </div>
              </div>

              <div className="form-group1 " style={{alignItems:"flex-start"}}>
              <div className="error_handle">
              <div className="inp">
             
              <AiOutlineMail/>
                <input
                  type="email"
                  placeholder="Enter your email*"
                  autoComplete="off"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  id="email"
                  required
                />
                </div>
                {errors.email && touched.email ?(
                <p style={{color:"red", marginLeft:"25px" }}>{errors.email}</p>) :null}
                </div>


              <div className="error_handle">
              <div className="inp">     
           <AiTwotonePhone style={{marginLeft:"10px"}}/>
                <input
                  type="tel"
                  autoComplete="off"
                  placeholder="Your Phone*"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="phone"
                  className="form-control"
                  id="phone"
                  required
                />
                </div>
                {errors.phone && touched.phone ?(
                <p style={{color:"red", marginLeft:"27px"}}>{errors.phone}</p>) :null}
              </div>
              </div>

              <div className="form-group1" style={{alignItems:"flex-start"}}>
             
              <div className="error_handle">
              <div className="inp">
             
              <RiLockPasswordFill/>
                <input
                  type="password"
                  placeholder="Enter password*"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  id="password"
                  required
                />
                </div>
                {errors.password && touched.password ?(
                <p style={{color:"red", marginLeft:"25px"}}>{errors.password}</p>) :null}
                </div>
                
                
                <div className="error_handle">
              <div className="inp">
              <RiLockPasswordFill style={{marginLeft:"10px"}} />
                <input
                
                  type="password"
                  placeholder="Enter confirm password*"
                  className="form-control"
                  value={values.confirmpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmpassword"
                  id="confirmpassword"
                  required
                />
                </div>
                {errors.confirmpassword && touched.confirmpassword ?(
                <p style={{color:"red", marginLeft:"25px"}}>{errors.confirmpassword}</p>) :null}
              </div>
              </div>

              <div className="AlreadyAccount">
                {" "}
                <NavLink to="/signin"> Already have a account</NavLink>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="sn loginform"
                  onClick={postData}
                >
                  Register Now
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

export default Registration;