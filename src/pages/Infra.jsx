import React from 'react'
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'
const Infra = () => {
    return (
        <div>
            <Navbar />
            <div className="w3-container">
            <br />
            <br />
                <h5 style={{textAlign:'center',fontWeight:'bold'}}>Infra Page</h5>
                <ul className="w3-ul w3-card-4">
                    <li><Link to="/bstlist">BST List</Link></li>
                    <li><Link to="#">Power</Link></li>
                    <li><Link to="#">BSO</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default Infra