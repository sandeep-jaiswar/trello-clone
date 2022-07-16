import "./index.scss"
import { useDispatch, useSelector } from "react-redux"
import { deletecard, updateCard } from "../../redux/actions/card"
import { addTask, dragTask } from "../../redux/actions/task"
import { memo, useRef } from "react"
import TaskCard from "../TaskCard"

function Card({ card, totalCards }) {
  const ref = useRef()
  const titleRef = useRef()
  const { title, id } = card
  const dispatch = useDispatch()
  const deleteCardHandler = () => {
    if (totalCards > 1) dispatch(deletecard(id))
  }

  const addTaskhandler = () => {
    if (!ref.current.value) return
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
    if (id === Number(e.dataTransfer.getData("cid"))) {
      return
    }
    dispatch(
      dragTask({
        taskId: Number(e.dataTransfer.getData("id")),
        startCardId: Number(e.dataTransfer.getData("cid")),
        title: e.dataTransfer.getData("title"),
        endCardId: id,
      })
    )
  }

  const onInput = (e) => {
    titleRef.current = e.currentTarget.textContent
  }
	
	const onBlur = ( e ) => {
		if(titleRef.current === title) return
		dispatch( updateCard( { id, title: titleRef.current } ) )
	}

  return (
    <div
      className="card"
      draggable
      onBlur={onBlur}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="card-header">
        <div
          className="card-title"
          suppressContentEditableWarning="true"
          contentEditable="true"
          onInput={onInput}
          id="card-title"
        >
          {title}
        </div>
      </div>
      <div className="card-body">
        {card.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="card-footer">
        <div className="addtask-container">
          <input
            type="text"
            className="addtask-input"
            placeholder="Add Task"
            ref={ref}
          />
          <span className="addtask-btn" onClick={addTaskhandler}>
            <img src="add.svg" height={"10px"} alt="add" />
          </span>
        </div>
        <button className="card-delete-btn" onClick={deleteCardHandler}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default memo(Card)
