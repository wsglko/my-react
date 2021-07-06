import React from 'react'
import { Component } from 'react'
import { useParams, useHistory, Link  } from 'react-router-dom'
import Navbar from '../../components/Navbar'
//import '../../components/bootstrap.min.css'
const ColoProvider = () => {
    let history = useHistory()
    return (
        <div>
            <Navbar onClick={()=>history.goBack()} />
            <br />
            <br />
            <div className="w3-container">
                <h3>Colo Provider</h3>
                <Link to="/ncp" className="w3-btn w3-blue w3-tiny"><i className="fa fa-plus"></i></Link>
            </div>
        </div>
    )
}
export default ColoProvider