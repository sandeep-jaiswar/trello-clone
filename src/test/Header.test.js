import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "../redux/reducers"
import Header from "../components/Header"
const init = () => {
  cards: [
    {
      id: "10101010",
      title: "Card 1",
      tasks: [],
    },
  ]
}

const tasks = {
  task: {
    id: 1657954065780,
    title: "ddxvcs",
    cid: 1657950453355,
  },
}

const store = createStore(rootReducer, init())

describe("testing taskcard.js", () => {
  test("renders body", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
  })
})
