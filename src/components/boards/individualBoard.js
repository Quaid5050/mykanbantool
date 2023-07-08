import React, { memo } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import CardModel from "./cardModel"
import IndividualCard from './individualCard';
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import UpdateModel from './updateBoard'
function IndividualBoard({ title, id, cards, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  // const navigate = useNavigate()

  let deleteBoard = async () => {

    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/deleteboard`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        id,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.stat === "success") {
      reload()
      console.log("success");

    } else {
      // toast.error("Something went wrong");
    }
  }
  let allCards = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getcards/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.stat === "success") {
      console.log("Cards data ")
      console.log(data.cards)
      setShowCards(data.cards);
    }
    console.log("🚀 ~ file: individualBoard.js:52 ~ allCards ~ data.cards", data.cards)
  }

  useEffect(() => {
    allCards()
  }, [])





  return (
    <div className='indboard'>
      <div className='inside_board'>
        <div className='cardtext'>{title}</div>
        <div className='icon_inside'>
          <AiFillDelete className='icons' style={{ color: "white" }} onClick={deleteBoard} />
          <AiFillEdit className='icons' style={{ color: "white" }} onClick={() => { setShowModalUpdate(true) }} />
        </div>


        {showModalUpdate && (
          <UpdateModel setShowModal={setShowModalUpdate} id={id} Maintitle={title} reload={reload}
          />
        )}

      </div>

      {showCards.length > 0 && showCards.map((data, e) => {
        return <IndividualCard className={{ marginLeft: "30px" }} title={data.title} boardId={id} id={data._id}
          setShowModal={setShowModal} allcards={cards} cardfun={allCards}

        />

      })}
      <div>
        {showModal && (
          <CardModel setShowModal={setShowModal} id={id} reload={reload} allcards={cards} cardfun={allCards}
          />
        )}
        <button className='card_button' onClick={() => { setShowModal(true) }}  >Add Card</button>
      </div>
    </div>
  )
}

export default memo(IndividualBoard)