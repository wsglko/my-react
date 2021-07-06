import React from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar'
const NewColoProvider = () => {
    let history = useHistory()
    return (
        <div>
            <Navbar onClick={() => history.goBack()} />
            <br />
            <br />
            <div className="w3-container">
                <h3>New Colo Provider</h3>
            </div>
        </div>
    )
}
export default NewColoProvider