import { useSelector, useDispatch } from "react-redux"
import { addCard } from "../../redux/actions/card";
import Card from "../Card";
import Header from "../Header";
import './index.scss';

export default function Dashboard() {
	const cards = useSelector( state => state.card.cards );
	const dispatch = useDispatch();
	const addCardsHandler = () => {
		dispatch( addCard())
		console.log( 'add card' );
	}
	const getCardsHtml = ( cards ) => {
		return (
      <div className="card-deck">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        <button className="add-card-btn" onClick={addCardsHandler}>
          Add Card
        </button>
      </div>
    )
	}
	return (
    <div className="dashboard">
      <Header />
      {getCardsHtml(cards)}
    </div>
  )
}