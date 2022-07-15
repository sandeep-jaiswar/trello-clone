import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTask, updateTask } from "../../redux/actions/task";
import "./index.scss"

export default function TaskCard({ task }) {
	const { id, title, cid } = task;
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState( false )
	const ref = useRef();
	const targetNode = useRef();
	const itemNode = useRef();
  const edithandler = () => {
    setIsEditing(true)
	}
	const savehandler = (e) => {
    dispatch(updateTask({ id, title: ref.current, cid }))
    setIsEditing(false)
	}
	
	const onDragStart = ( e, task ) => {
		itemNode.current = e.target;
		console.log( "drag start", itemNode.current )
		e.dataTransfer.setData( "id", task.id )
		e.dataTransfer.setData( "cid", task.cid )
		e.dataTransfer.setData("title", task.title)
		//console.log('e.target', e.target)
	}

	const onDragEnter = ( e,task ) => {
		targetNode.current = e.target
		console.log("drag enter", targetNode.current)
	}

	const onDragEnd = ( e ,i ) => {
		console.log( "drag end",i)
	//	console.log("e.target", e.target)
	}

	const onDragOver = ( e ) => {
		console.log( "drag over", e )
		e.preventDefault()
		// console.log("e.target", e.target)
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
      // onDrop={onDragEnd}
      // onDragOver={onDragOver}
      // onDragEnd={onDragEnd}
      // onDragEnter={onDragEnter}
      id={id}
    >
      <div className="title" onInput={onChange} contentEditable={isEditing}>
        {title}
      </div>
      <div className="action-btn">
        {!isEditing ? (
          <button className="edit-btn" onClick={edithandler}>
            Edit
          </button>
        ) : (
          <button className="save-btn" onClick={(e) => savehandler(e)}>
            Save
          </button>
        )}
        <button className="delete-btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  )
}
