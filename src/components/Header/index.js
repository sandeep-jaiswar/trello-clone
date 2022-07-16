import { memo } from 'react'
import './index.scss'

function Header( props ) {
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

export default memo( Header )