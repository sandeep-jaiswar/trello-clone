import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "../redux/reducers"
import TaskCard from "../components/TaskCard"
import userEvent from "@testing-library/user-event"
const init = () => {
  cards: [
    {
      id: "10101010",
      title: "Card 1",
      tasks: [],
    },
  ]
}

const tasks={
  "task": {
    "id": 1657954065780,
    "title": "ddxvcs",
    "cid": 1657950453355
  }
}

const store = createStore( rootReducer, init() )

afterEach(cleanup)

describe("testing taskcard.js", () => {
  test("renders body", () => {
    render(
      <Provider store={store}>
        <TaskCard task={tasks} />
      </Provider>
    )
	} )

	test("on update title", async () => {
    render(
      <Provider store={store}>
        <TaskCard task={tasks} />
      </Provider>
		)
		fireEvent.click(screen.getByTestId("task-title-edit"))
    const titleDiv = screen.getByTestId("task-title")
    titleDiv.innerHTML = ""
    await userEvent.click(titleDiv)
		await userEvent.keyboard( "abc" )
		fireEvent.click(screen.getByTestId("task-title-save"))
		expect( titleDiv.innerHTML ).toBe( "abc" )
	} )
	
	test("delete task", async () => {
    render(
      <Provider store={store}>
        <TaskCard task={tasks} />
      </Provider>
    )
    fireEvent.click(screen.getByTestId("task-title-delete"))
  })
})
