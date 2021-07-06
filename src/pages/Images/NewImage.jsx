import React, { useState } from 'react'
import { useParams, useHistory  } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import DatePicker from 'react-date-picker'

const NewImage = () => {
    let history = useHistory()
    const [loading, setLoading] = useState(false)
    const [imgName, setImgName] = useState("")
    const [delUrl, setDelUrl] = useState("")
    const [viewUrl, setViewUrl] = useState("")
    const [imgDate, setImgDate] = useState(new Date())
    const [imgCat, setImgCat] = useState("Official")
    const [imgDetails, setImgDetails] = useState("")
    const [updateBy, setUpdateBy] = useState("")
    const [updateOn, setUpdateOn] = useState(new Date())

    const imageDetails = { "delUrl": delUrl, "viewUrl": viewUrl, "imgDate": imgDate, "imgCat": imgCat, "imgDetails": imgDetails, "updateBy": updateBy, "updateOn": updateOn }
    
    const selImage = (e) => {
        setImgName(e.target.files[0])
        console.log(imgName)
    }
    const uploadImage = (e) => {
        //console.log(e.target.files)
        const files = e.target.files[0]
        const formData = new FormData()
        formData.set('key', 'a2c02e808c1ae096e5ed88cd2accd7a3')
        formData.append('image', files)
        axios.post('https://api.imgbb.com/1/upload', formData)
            .then(res => {
                console.log(res.data)
                if (res.data !== null || res.data !== "") {
                    //alert("Not Null")
                    setViewUrl(res.data.data.display_url)
                    setDelUrl(res.data.data.delete_url)
                    setLoading(true)
                } else {
                    alert("Null")
                }
            }).catch(err => {
                console.log("Image URL not Recd.: "+err)
            })
    }
    const saveData = () => {
        axios.post("https://main-qovery--pqt2vjn0u4yghzyy-gtw.qovery.io/api/newimage",imageDetails)
                        .then(res => {
                            if (res.data.status === true) {
                                alert("Data Added")
                                history.push('/snaps')
                            } else {
                                alert("Error")
                            }
                        }).catch(err => {
                            console.log(err)
                        })
    }

    //const imglist = image.map((item, key) => <div><h5 key={key}>{item.display_url}</h5></div>)
    return (
        <div>
            <Navbar onClick={() => history.goBack()} />
            <br />
            <br />
        <div className="w3-container">
            <h1>Image upload</h1>
            <select className="w3-select" onChange={(e)=>setImgCat(e.target.value)}>
                <option value="" disabled>--Select--</option>
                <option value="Official">Official</option>
                <option value="Personal">Personal</option>
                <option value="Others">Others</option>
            </select>
            <br />
            <textarea className="w3-input" onChange={(e) => setImgDetails(e.target.value)}></textarea>
            <br />
            <div>
                    <DatePicker
                        onChange={setImgDate}
                        value={imgDate}
                    />        
            </div>
            <br/>
            <input className="w3-file" type="file" name="image" onChange={(e) => uploadImage(e)} />
            <hr />
            {loading === true ? <button className="w3-btn w3-blue" onClick={saveData}>Save</button> : <button className="w3-btn w3-blue w3-disabled" onClick={saveData}>Save</button>}
            <br />
            <br />
            <div>
                {loading === true ? <img src={viewUrl} width="150" height="250" alt={viewUrl}/> : <h5>Image not selected</h5>}
            </div>
            <br />
        </div>
        </div>
    )
}
export default NewImage