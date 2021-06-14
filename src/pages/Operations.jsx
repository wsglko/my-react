import React from 'react'
import Navbar from '../components/Navbar'
//import {Link} from 'react-router-dom'
import SideBar from '../components/SideBar'

const Operations = () => {
    return (
        <div>
            <Navbar/>
            <br/>
            <br/>
            <SideBar/>
                <div style={{marginLeft:60}}>
                    <div className="w3-container">
                    </div>
                </div>
        </div>
    )
}

export default Operations