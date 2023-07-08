import React, { useState, useEffect } from 'react'
import "./board.css"
import BoardModel from "./boardModel"
import { useParams } from "react-router-dom";
import IndividualBoard from './individualBoard';

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [showBoards, setShowBoards] = useState(false);

  const { id } = useParams();



  let allBoards = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getboards/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.stat === "success") {
      console.log(data.boards)
      setShowBoards(data.boards);
    }
  }

  useEffect(() => {
    allBoards()
  }, [])

  return (
    <div className='show_main'>
      <div className='show'>
        {showBoards.length > 0 && showBoards.map((data, e) => {
          return <IndividualBoard key={e} title={data.title} id={data._id} reload={allBoards} />
        })}

        <div>
          {showModal && (
            <BoardModel setShowModal={setShowModal} reload={allBoards}
            />
          )}
          <button className='board_button' onClick={() => { setShowModal(true) }} >Add Board</button>
        </div>
      </div>
    </div>
  )
}

export default Index