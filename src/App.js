import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Homepage} from "./Homepage";
import {Signin} from "./Signin"
import Signup from "./signup"
import Help from "./help"
import {Route, Routes} from "react-router-dom";
import Main from "./main";
import "./index.css"
import "./App.css"
import Desktop from "./desktop";
import Taskreport from "./Taskreport";
import Projectprogressreport from "./Projectprogressreport";
import Employeereport from "./employeereport";
function App() {
  return (
<>    
    <Routes>
    
<Route path="/" element={<Homepage/>}/>
<Route path="/help" element={<Help/>}/>
<Route path="/signin" element={<Signin/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/main/:id" element={<Main/>}/>
<Route path="/desktop" element={<Desktop/>}/>
<Route path="/taskreport" element={<Taskreport/>}/>
<Route path="/projectprogressreport/:id" element={<Projectprogressreport/>}/>
<Route path="/employeereport/:id" element={<Employeereport/>}/>
    </Routes>
    </>

  );
}

export default App;
