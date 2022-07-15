export const addCard = ( ) => {
	return {
		type: 'ADD_CARD',
		payload: {
			title : "New Card",
			tasks : [],
			id: Date.now()
		}
	}
}

export const deletecard = ( id ) => {
	return {
		type: 'DELETE_CARD',
		payload: id
	}
}