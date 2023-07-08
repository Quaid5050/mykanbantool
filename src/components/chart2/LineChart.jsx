import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

ChartJS.register(...registerables);
function LineChart() {
  let navigate = useNavigate();
  const [showBoards, setShowBoards] = useState(false);
  
  const [tasks, setTasks] = useState(false);
  // const [employe, changeEmployee] = useState("");
  const [type, setType] = useState("");

  const [count, setCounts] = useState({ completed: 0, total: 0 });
  const [datay, setdatay] = useState([])
  console.log("🚀 ~ file: LineChart.jsx:16 ~ LineChart ~ datay:", datay)
  const [datax, setdatax] = useState([])
  console.log("🚀 ~ file: LineChart.jsx:18 ~ LineChart ~ datax:", datax)

  // const [teamassigned, setTeamAssigned] = useState([]);
  // console.log("🚀 ~ file: LineChart.jsx:13 ~ LineChart ~ teamassigned", teamassigned)

  const { id } = useParams();



  let allTasks = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getburntasks/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.stat === "success") {
      console.log("chart data", data?.tasks)
      if (data?.tasks?.length > 0) {
        let total=0;
        let completed=0;
        data?.tasks.map((da)=>{
          total++;
          if(da.priority=="0")
          {
            completed++
          }
        })
console.log("prinitng number of completed tasks",completed);
        let TotalDays = 0;
        let a = []
        let datashow = [];
        
          //create days in chart
          let time = new Date(data?.project?.created_at);
          console.log("🚀 ~ file: LineChart.jsx:57 ~ allTasks ~ data?.project?.created_at:", data?.project?.created_at)
          let date = new Date();
          let difference = date.getTime() - time.getTime();
          TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;


          for (let i = 1; i <= TotalDays; i++) {
            a.push("Day " + i)
            datashow.push(total);
          }
          datashow[datashow.length - 1] = total - completed;
           
          setdatax(a)
           setdatay(datashow)

      }
      setTasks(data?.tasks);

    }
  }

  useEffect(() => {
    allTasks()
  }, [])



            //get team member from database
            const[teamMember,setTeamMembers]=useState("");
            let allTeam=async ()=>{
              const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getteam/${id}`, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/json"
                },
                credentials: "include",
              });
              const data = await res.json();
              console.log("🚀 ~ file: LineChart.jsx:48 ~ allTeam ~ data", data)

              if (data.stat === "success") {
                    setTeamMembers(data?.project[0]?.teamMembers)

              }  
            }

            useEffect(()=>{
              allTeam()
                  },[])  

                  const[tTask,setTask]=useState({});
                  const[cTask,setcTask]=useState({});


    const data = {
      labels: datax,
    datasets:
     [
        {
          label: 'Project Progress',
          data: datay,
           borderColor: ['rgba(0, 100, 0, 0.8)'],
           backgroundColor: ['rgba(0, 100, 0, 0.8)'],
          pointBackgroundColor: 'rgba(0, 0, 0, 0.8)',
          pointBorderColor: 'rgba(255, 206, 86, 0.2)'
        },
        // {
        //   label: 'Employe Progress',
        //   data: [10, 8, 8, 7, 7,6,4,3,2,0],
        //   // borderColor: ['rgba(0, 0, 128, 0.8)'],
        //   // backgroundColor: ['rgba(0, 0, 128, 0.8)'],
        //   // pointBackgroundColor: 'rgba(0, 0, 0, 0.8)',
        //   // pointBorderColor: 'rgba(255, 206, 86, 0.2)'
        // }
      ]
    }
  //     //get employe in 
  const[data2,setdata2]=useState("");
  const[temp,settemp]=useState(0);
  const[cemp,setcemp]=useState(0);
  const[nemp,setnemp]=useState("");
 
  let changeEmployee=(email_name) => {
    console.log("🚀 ~ file: LineChart.jsx:163 ~ changeEmployee ~ email_name", email_name)
      //show on chart
      setnemp(email_name);
let total=0;
let completed=0;

      tasks.map((da)=>{
        if(da?.assigned==email_name){

         total++;
        if(da.priority=="0" )
        {
          completed++
        }
      }
      })


      settemp(total);
      setcemp(completed)
    let copy=datay;
    copy[0]=total;
    copy[copy.length-1]=total-completed;

    setdata2( {
      labels: datax,
    datasets:
     [
        {
          label: email_name,
          data: copy,
          borderColor: ['rgba(0, 100, 0, 0.8)'],
          backgroundColor: ['rgba(0, 100, 0, 0.8)'],
          pointBackgroundColor: 'rgba(0, 0, 0, 0.8)',
          pointBorderColor: 'rgba(255, 206, 86, 0.2)'
        },
        // {
        //   label: 'Employe Progress',
        //   data: [10, 8, 8, 7, 7,6,4,3,2,0],
        //   // borderColor: ['rgba(0, 0, 128, 0.8)'],
        //   // backgroundColor: ['rgba(0, 0, 128, 0.8)'],
        //   // pointBackgroundColor: 'rgba(0, 0, 0, 0.8)',
        //   // pointBorderColor: 'rgba(255, 206, 86, 0.2)'
        // }
      ]
    })
  }
  const[demoTest,setdemoTest]=useState(false);

  return <>

<h1>Choose the type of chart</h1>

<select onChange={(e)=>{
  setType(e.target.value)
  setdemoTest(false)
  console.log("🚀 ~ file: LineChart.jsx:259 ~ LineChart ~ e.target.value:", e.target.value)
  }
  }>
<option value=""></option>
<option value="project">Project Progress</option>
<option value="employee">Employee Progress</option>
</select>

    
   { datax.length > 0 && type=="project"?<><h1><b>Project Progress Burn Down:</b></h1><Line data={data}/></>:""}

   {type=="employee"? <div className='iopb'>
    <h2> Choose Employee</h2>
<select name="employee"    onChange={(e) => {
                    // setDependency(e.target.value);
                    console.log(e.target.value)
                    
                    if(e.target.value!=""){
                         setdemoTest(true);
                        changeEmployee(e.target.value)  
                    
                    }
                    else{
                      setdemoTest(false)
                    }
                  }}>
                    <option value=""></option> 
    {teamMember && teamMember.map((data)=>{
    return <option value={data}>{data}</option>
    })}
     </select>
     </div>:""}
    {  demoTest && (<><Line data={data2}/>
    <div>
 <button onClick={()=>{navigate(`/employeereport/${nemp}?total=${temp}&com=${cemp}`)}}  style={{padding:"10px 25px",background:" #f39c12",color:"white",borderRadius:"12px",marginLeft:"30px",marginTop:"10px"}}>Employee Progress</button>
 </div>
    </>)}
  </>
}

export default LineChart