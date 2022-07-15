import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTask, updateTask } from "../../redux/actions/task";
import "./index.scss"

export default function TaskCard({ task }) {
	const { id, title, cid } = task;
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState( false )
	const ref = useRef();
  const edithandler = () => {
    setIsEditing(true)
	}
	const savehandler = () => {
    dispatch(updateTask({ id, title: ref.current, cid }))
    setIsEditing(false)
	}
	
	const onDragStart = ( e, task ) => {
		e.dataTransfer.setData( "id", task.id )
		e.dataTransfer.setData( "cid", task.cid )
		e.dataTransfer.setData("title", task.title)
	}


	const onDragEnd = ( e ,i ) => {
		console.log( "drag end",i)
	//	console.log("e.target", e.target)
	}


	const onChange = ( e ) => {
		ref.current = e.currentTarget.textContent;
	}

	const deleteHandler = () => {
		dispatch(deleteTask({ id, title, cid }))
	}
  return (
    <div
      draggable="true"
      onDrop={onDragEnd}
      className="taskcard"
      onDragStart={(e) => onDragStart(e, task)}
      id={id}
    >
      <div
        className="title"
        onInput={onChange}
        suppressContentEditableWarning="true"
        contentEditable={isEditing}
      >
        {title}
      </div>
      <div className="action-btn">
        {!isEditing ? (
          <div className="edit-btn" onClick={edithandler}>
            <img src="edit.svg" height={"10px"} alt="edit" />
          </div>
        ) : (
          <div className="save-btn" onClick={(e) => savehandler(e)}>
            <img src="save.svg" height={"10px"} alt="save" />
          </div>
        )}
        <div className="delete-btn" onClick={deleteHandler}>
          <img src="delete.svg" height={"10px"} alt="add" />
        </div>
      </div>
    </div>
  )
}
