import "./index.scss"
import { useDispatch, useSelector } from "react-redux"
import { deletecard } from "../../redux/actions/card"
import { addTask, dragTask } from "../../redux/actions/task"
import { useRef } from "react"
import TaskCard from "../TaskCard"

export default function Card({ card }) {
  const ref = useRef()
  const { title, id } = card
  const dispatch = useDispatch()
  const cards = useSelector((state) => state.card.cards)
  const deleteCardHandler = () => {
    console.log("cards", cards)
    if (cards.length > 1) dispatch(deletecard(id))
  }

  const addTaskhandler = () => {
    dispatch(addTask({ title: ref.current.value, cid: id }))
    ref.current.value = ""
  }

  const onDragOver = (e) => {
    console.log("drag over", e)
    e.preventDefault()
  }

  const onDrop = (e) => {
    console.log("drop", e, id)
    console.log("card", e.dataTransfer.getData("cid"))
    console.log("item", e.dataTransfer.getData("id"))
    dispatch(
      dragTask({
        taskId: Number(e.dataTransfer.getData("id")),
        startCardId:Number( e.dataTransfer.getData("cid")),
        title: e.dataTransfer.getData("title"),
        endCardId: id,
      })
    )
  }

  return (
    <div className="card" draggable onDragOver={onDragOver} onDrop={onDrop}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        {card.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="card-footer">
        <div className="addtask-container">
          <input type="text" className="addtask-input" ref={ref} />
          <button className="addtask-btn" onClick={addTaskhandler}>
            +
          </button>
        </div>
        <button className="card-delete" onClick={deleteCardHandler}>
          Delete
        </button>
      </div>
    </div>
  )
}
