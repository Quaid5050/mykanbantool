import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from "./components/navbar/navbar";
import CardInfo from "./components/proj_create/project_create";
import { useNavigate } from "react-router-dom";
import TaskDetail from './components/boards/assignedtask';

function Desktop() {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [projects, setprojects] = useState([]);
  const [showTask, setShowTask] = useState(false);

  let allProjects = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getprojects`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.stat === "success") {
      console.log(data.projects)
      setprojects(data.projects);
    }

  }



  const [tasks, settasks] = useState([]);


  let allTasks = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/gettasks`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.stat === "success") {
      console.log(data.tasks)
      settasks(data.tasks);
    }

  }



  let auth = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.stat === "wrong") {
      navigate("/")
    }

  }

  useEffect(() => {
    auth()
  }, [])

  useEffect(() => {
    allProjects()
    allTasks();
  }, [])

  return (
    <><Navbar />
      <div className='desktop'>

        <div className='first_part'>
          {showModal && (
            <CardInfo setShowModal={setShowModal}
            />
          )}
          <div className='center_project'>
            <div className='project' onClick={() => { setShowModal(true) }}>
              Create  Project
            </div>
          </div>
          <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
            <div>
              <h2 className='text'>Recent Projects</h2>
              <div><ul>


                {projects && projects.map((data, e) => {
                  return <li key={e} className="pro_li" onClick={() => { navigate(`/main/${data._id}`) }}>{data.title}</li>
                })}

              </ul>
              </div></div>
            <div>
              <h2 className='text'>Assigned Tasks</h2>
              <div><ul>


                {tasks && tasks.map((data, e) => {
                  return <>
                    {showTask && <TaskDetail index={e} _id={showTask?._id} Maintitle={showTask?.title} Maindescription={showTask?.description} Mainpriority
                      ={showTask?.priority} Maindeadline={showTask?.deadline} Maindependency={showTask?.dependency} allTasks={allTasks} setShowModal={setShowTask} />}
                    <li key={e} className="pro_li" onClick={() => { setShowTask(data) }} >{data.title}</li>
                  </>
                })}

              </ul>
              </div></div>
          </div>
        </div>



        <div className='second_part'>

          <div className="first">
            <h1 className='hea'>A Project Management Tool</h1>
            <p> Which Will Provide Kanban Boards And Cards To Manage Workflow Visually
              And There will be effective team Communication  And Performance</p>

          </div>
          <div className="second">
            <img src="/logo.jpeg" />
          </div>

        </div>


      </div>
    </>)
}

export default Desktop