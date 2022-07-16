import { memo } from "react";
import { useSelector, useDispatch } from "react-redux"
import { addCard } from "../../redux/actions/card";
import Card from "../Card";
import Header from "../Header";
import './index.scss';

function Dashboard() {
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
          <Card key={card.id} card={card} totalCards={cards?.length || 0} />
        ))}
        <div className="bottom">
          <div className="add-card-btn" onClick={addCardsHandler}>
            <img src="add.svg" height={"14px"} alt="add" />
          </div>
        </div>
      </div>
    )
	}
	return (
    <div className="dashboard">
			<Header />
			<div className="dashboard-body">
				{getCardsHtml( cards )}
				</div>
    </div>
  )
}

export default memo( Dashboard );