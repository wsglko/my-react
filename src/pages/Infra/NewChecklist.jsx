import React, { useState } from 'react'
import { useParams, useHistory, Redirect  } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-date-picker'

const NewCheklist = () => {
    return (
        <div>
            <h2>New Checklist</h2>
        </div>
    )
}
export default NewCheklist