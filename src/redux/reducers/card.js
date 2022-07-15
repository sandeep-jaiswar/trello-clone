const initialStore = {
  cards: [
    {
      id: Date.now(),
      title: "Add Title",
      tasks: [],
    },
  ],
}

function cardReducer(state = initialStore, action) {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.payload],
      }
    case "ADD_TASK":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.cid) {
            return {
              ...card,
              tasks: [...card.tasks, action.payload],
            }
          }
          return card
        }),
      }
    case "DRAG_TASK":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.startCardId) {
            return {
              ...card,
              tasks: card.tasks.filter(
                (task) => task.id !== action.payload.taskId
              ),
            }
          } else if (card.id === action.payload.endCardId) {
            return {
              ...card,
              tasks: [
                ...card.tasks,
                {
                  id: action.payload.taskId,
                  title: action.payload.title,
                  cid: action.payload.endCardId,
                },
              ],
            }
          }
          return card
        }),
      }
    case "UPDATE_TASK":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.cid) {
            return {
              ...card,
              tasks: card.tasks.map((task) => {
                if (task.id === action.payload.id) {
                  return {
                    ...task,
                    title: action.payload.title,
                  }
                }
                return task
              }),
            }
          }
          return card
        }),
      }
    case "UPDATE_CARD":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.id) {
            return {
              ...card,
              title: action.payload.title,
            }
          }
          return card
        }),
      }
    case "DELETE_TASK":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.cid) {
            return {
              ...card,
              tasks: card.tasks.filter((task) => {
                return task.id !== action.payload.id
              }),
            }
          }
          return card
        }),
      }
    case "DELETE_CARD":
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      }
    default:
      return state
  }
}

export default cardReducer
