import './index.scss'

export default function Header( props ) {
	return (
    <div className="header">
      <div className="content">
        <div className="header-title">Trello-Clone</div>
        <div className="action-btn">
          <button className="signout-btn">Sign Out</button>
        </div>
      </div>
    </div>
  )
}