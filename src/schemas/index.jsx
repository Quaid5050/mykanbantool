import * as yup from "yup"
export const signupSchema=yup.object({
    firstname: yup.string().min(2,"Name should be atleast two characters").max(25).required("please enter your name"),
    lastname:  yup.string().min(2,"Company name should be atleast two characters").max(25).required("please enter your Company Name"),
    email:  yup.string().email().required("please enter your Email"),
    phone:  yup.number().min(11).required("please enter your Phone Number"),
    password:  yup.string().min(6).required("please enter your password"),
    confirmpassword:  yup.string().required().
    oneOf([yup.ref("password"),null],"password must match"),
  

}) 