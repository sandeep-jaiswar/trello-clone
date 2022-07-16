/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { Provider } from "react-redux"
import { createStore } from "redux"
import Card from "../components/Card"
import { deletecard, updateCard } from "../redux/actions/card"
import { addTask, dragTask } from "../redux/actions/task"
import rootReducer from "../redux/reducers"


const fireMouseEvent = function (
  type,
  elem,
  centerX,
  centerY
) {
  const evt = document.createEvent("MouseEvents")
  evt.initMouseEvent(
    type,
    true,
    true,
    window,
    1,
    1,
    1,
    centerX,
    centerY,
    false,
    false,
    false,
    false,
    0,
    elem
  )
  return elem.dispatchEvent(evt)
}

const dragAndDrop = (elemDrag, elemDrop) => {
  act(() => {
    // calculate positions
    let pos = elemDrag.getBoundingClientRect()
    const center1X = Math.floor((pos.left + pos.right) / 2)
    const center1Y = Math.floor((pos.top + pos.bottom) / 2)

    pos = elemDrop.getBoundingClientRect()
    const center2X = Math.floor((pos.left + pos.right) / 2)
    const center2Y = Math.floor((pos.top + pos.bottom) / 2)

    // mouse over dragged element and mousedown
    fireMouseEvent("mousemove", elemDrag, center1X, center1Y)
    fireMouseEvent("mouseenter", elemDrag, center1X, center1Y)
    fireMouseEvent("mouseover", elemDrag, center1X, center1Y)
    fireMouseEvent("mousedown", elemDrag, center1X, center1Y)

    // start dragging process over to drop target
    const dragStarted = fireMouseEvent(
      "dragstart",
      elemDrag,
      center1X,
      center1Y
    )
    if (!dragStarted) {
      return
    }

    fireMouseEvent("drag", elemDrag, center1X, center1Y)
    fireMouseEvent("mousemove", elemDrag, center1X, center1Y)
    fireMouseEvent("drag", elemDrag, center2X, center2Y)
    fireMouseEvent("mousemove", elemDrop, center2X, center2Y)

    // trigger dragging process on top of drop target
    fireMouseEvent("mouseenter", elemDrop, center2X, center2Y)
    fireMouseEvent("dragenter", elemDrop, center2X, center2Y)
    fireMouseEvent("mouseover", elemDrop, center2X, center2Y)
    fireMouseEvent("dragover", elemDrop, center2X, center2Y)

    // release dragged element on top of drop target
    fireMouseEvent("drop", elemDrop, center2X, center2Y)
    fireMouseEvent("dragend", elemDrag, center2X, center2Y)
    fireMouseEvent("mouseup", elemDrag, center2X, center2Y)
  })
}

const init = () => {
  return {
    card: {
      cards: [
        { id: 1, tasks: [], title: "Add Title" },
        { id: 2, tasks: [], title: "Add Title" },
      ],
    },
  }
}

const store = createStore(rootReducer, init())

const cardprops = {
  card: {
    id: 1,
    title: "To Do",
    tasks: [],
  },
  totalCards: 2,
}

afterEach(cleanup)

describe("testing card.js", () => {
  test("should take a snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Card {...cardprops} />
      </Provider>
    )
    expect(
      asFragment(
        <Provider store={store}>
          <Card {...cardprops} />
        </Provider>
      )
    ).toMatchSnapshot()
  })

  test("add task", () => {
    const previousState = {
      card: {
        cards: [
          { id: 1, tasks: [], title: "Add Title" },
          { id: 2, tasks: [], title: "Add Title" },
        ],
      },
    }
    const arr = {
      card: {
        cards: [{ id: 1, tasks: [], title: "Add Title" }],
      },
    }

    render(
      <Provider store={store}>
        <Card card={previousState.card.cards[1]} totalCards={2} />
      </Provider>
    )
    const input = screen.getByTestId("add-task-input")
    fireEvent.change(input, { target: { value: "Sandeep" } })
    expect(input.value).toBe("Sandeep")

    const addTaskButton = document.querySelector(".addtask-btn")
    fireEvent.click(addTaskButton)
  })

  test("edit card title", async () => {
    const previousState = {
      card: {
        cards: [
          { id: 1, tasks: [], title: "Add Title" },
        ],
      },
    }
    const arr = {
      card: {
        cards: [{ id: 1, tasks: [], title: "abc" }],
      },
    }

    render(
      <Provider store={store}>
        <Card card={previousState.card.cards[0]} totalCards={2} />
      </Provider>
    )

    const titleDiv = screen.getByTestId("card-title")
    titleDiv.innerHTML = ""
    await userEvent.click(titleDiv)
    await userEvent.keyboard("abc")
		expect( titleDiv.innerHTML ).toBe( "abc" )
		expect( rootReducer( previousState, updateCard( {
			id: 1,
			title: "abc"
		} ) ) ).toEqual( arr )
		titleDiv.blur()
  })

  test("delete card", () => {
    const previousState = {
      card: {
        cards: [
          { id: 1, tasks: [], title: "Add Title" },
          { id: 2, tasks: [], title: "Add Title" },
        ],
      },
    }
    const arr = {
      card: {
        cards: [{ id: 1, tasks: [], title: "Add Title" }],
      },
    }

    render(
      <Provider store={store}>
        <Card card={previousState.card.cards[1]} totalCards={2} />
      </Provider>
    )
    fireEvent.click(screen.getByTestId("delete-card"))
    expect(rootReducer(previousState, deletecard(2))).toEqual(arr)
  })

  test("drag one task from one card to another", () => {
    const previousState = {
      card: {
        cards: [
          {
            id: 1,
            tasks: [
              {
                id: 1,
                cid: 1,
                title: "Task 1",
              },
            ],
            title: "Add Title",
          }
        ],
      },
    }
    const arr = {
      card: {
        cards: [
          {
            id: 1,
            tasks: [
              {
                id: 1,
                cid: 1,
                title: "Task 1",
              },
            ],
            title: "Add Title",
          }
        ],
      },
    }

    render(
      <Provider store={store}>
        <Card card={previousState.card.cards[0]} totalCards={1} />
      </Provider>
		)
		dragAndDrop(screen.getByText("Task 1"), screen.getByText("Add Title"))
  })
})
