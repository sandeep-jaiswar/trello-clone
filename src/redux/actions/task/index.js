export const addTask = ( task ) => {
	return {
		type: 'ADD_TASK',
		payload: {
			id: Date.now(),
			title: task.title,
			cid: task.cid
		}
	}
}

export const updateTask = ( task ) => {
	return {
		type: 'UPDATE_TASK',
		payload: {
			id: task.id,
			title: task.title,
			cid: task.cid
		}
	}
}

export const deleteTask = ( task ) => {
	return {
    type: "DELETE_TASK",
    payload: {
      id: task.id,
      title: task.title,
      cid: task.cid,
    },
  }
}

export const dragTask = ( task ) => {
	return {
		type: 'DRAG_TASK',
		payload: {
			startCardId: task.startCardId,
			endCardId: task.endCardId,
			taskId: task.taskId,
			title: task.title,
		}
	}
}