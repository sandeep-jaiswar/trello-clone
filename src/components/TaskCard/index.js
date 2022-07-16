import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTask, updateTask } from "../../redux/actions/task";
import "./index.scss"

export default function TaskCard({ task }) {
	const { id, title, cid } = task;
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState( false )
	const ref = useRef(title);
  const edithandler = () => {
    setIsEditing(true)
	}
	const savehandler = () => {
    dispatch(updateTask({ id, title: ref.current, cid }))
    setIsEditing(false)
	}
	
	const onDragStart = ( e, task ) => {
		if (e?.dataTransfer?.setData) {
      e.dataTransfer.setData("id", task.id)
      e.dataTransfer.setData("cid", task.cid)
      e.dataTransfer.setData("title", task.title)
    }
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
      className="taskcard"
      onDragStart={(e) => onDragStart(e, task)}
      id={id}
    >
      <div
        className="title"
        onInput={onChange}
        suppressContentEditableWarning="true"
        contentEditable={isEditing}
        data-testid="task-title"
      >
        {title}
      </div>
      <div className="action-btn">
        {!isEditing ? (
          <div
            className="edit-btn"
            data-testid="task-title-edit"
            onClick={edithandler}
          >
            <img src="edit.svg" height={"10px"} alt="edit" />
          </div>
        ) : (
          <div
            className="save-btn"
            data-testid="task-title-save"
            onClick={(e) => savehandler(e)}
          >
            <img src="save.svg" height={"10px"} alt="save" />
          </div>
        )}
        <div
          className="delete-btn"
          data-testid="task-title-delete"
          onClick={deleteHandler}
        >
          <img src="delete.svg" height={"10px"} alt="add" />
        </div>
      </div>
    </div>
  )
}
