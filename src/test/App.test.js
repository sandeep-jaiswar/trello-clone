import { render, screen } from "@testing-library/react"
import App from "../App"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "../redux/reducers"
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

describe("RENDERS APP", () => {
  test("renders learn react link", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
  })
})
