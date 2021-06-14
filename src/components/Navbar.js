import React from 'react'
import {Link} from 'react-router-dom'
//import {SearchBar} from './SearchBar'
const Navbar = ({onClick}) => {
  return (
    <div className="w3-top">
      <div className="w3-bar w3-green w3-padding">
        <Link to="/" className="w3-bar-item w3-button">Home</Link>
        <Link to="/gis" className="w3-bar-item w3-button">GIS</Link>
        <div className="w3-dropdown-hover">
          <Link to="#" className="w3-bar-item w3-button">Infra</Link>
          <div className="w3-dropdown-content w3-green w3-bar-block w3-card-4">
            <Link to="/bstlist" className="w3-bar-item w3-button">BST List</Link>
            <Link to="#" className="w3-bar-item w3-button">Power</Link>
            <Link to="#" className="w3-bar-item w3-button">BSO</Link>
          </div>
        </div>
        <Link to="/operation" className="w3-bar-item w3-button">Operation</Link>
        <button className="w3-bar-item w3-button" onClick={onClick}><i className="fas fa-arrow-left"></i></button>
      </div>
    </div>
  )
}
export default Navbar
