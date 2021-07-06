import React from 'react'
import { Link } from 'react-router-dom'
import './w3.css'

export const SearchBar = ({onChange,onClick}) => {
    return (
        <div className="w3-top w3-bar w3-green w3-padding">
            <Link to="/" className="w3-bar-item w3-button">Home</Link>
            <input type="text" className="w3-bar-item w3-input" placeholder="Search..." onChange={onChange} />
            <button className="w3-bar-item w3-button" onClick={onClick}><i className="fas fa-arrow-left"></i></button>
        </div>
    )
}
//export default SearchBar