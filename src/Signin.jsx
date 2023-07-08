import Signincomponent from "./components/Signin/signincomponent"
import Navbar from "./components/navbar/navbar";
import "./global.css"
export function Signin()
{
    return (
<div className="signinback"><Navbar></Navbar>
    <Signincomponent/>
  
  </div>  )
}