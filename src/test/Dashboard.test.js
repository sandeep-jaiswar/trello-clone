import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "../redux/reducers"
import Dashboard from "../components/Dashboard"
const init = () => {
  cards: [
    {
      id: "10101010",
      title: "Card 1",
      tasks: [],
    },
  ]
}

const store = createStore(rootReducer, init())

describe("testing taskcard.js", () => {
  test("renders body", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    )
  })
})
