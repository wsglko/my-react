import React from 'react'
import {Link} from 'react-router-dom'

const SideBar = () => {
    return (
        <div className="w3-sidebar w3-bar-block w3-white w3-xlarge" style={{width:60}}>
            <Link to="#" className="w3-bar-item w3-button"><i className="fa fa-shopping-bag"></i></Link>
            <Link to="#" className="w3-bar-item w3-button"><i className="fa fa-bolt"></i></Link>
            <Link to="#tower" className="w3-bar-item w3-button"><i className="fa fa-broadcast-tower"></i></Link>
        </div>
    )
}
export default SideBar