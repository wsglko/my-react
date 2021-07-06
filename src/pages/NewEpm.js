import React, { useState } from 'react'
import { useParams, useHistory, Redirect  } from 'react-router-dom'
import Navbar from '../components/Navbar'
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-date-picker'

const NewEpm = () => {
    let history = useHistory()
    const { bstID, bstName } = useParams()
    const [bstid, setBstid] = useState(bstID)
    const [bstname, setBstname] = useState(bstName)
    const [preReading, setPreReading] = useState("")
    const [currReading, setCurrReading] = useState("")
    const [dfReading, setDfReading] = useState("")
    const [reqid, setReqid] = useState(0)
    const [billdate, setBilldate] = useState(new Date())
    const [billamount, setBillamount] = useState(0)
    const [benifname, setBenifname] = useState("")
    const [status, setStatus] = useState(['PENDING', 'PAID', 'REJECT', 'NOT-RAISED'])
    const [statusKey, setStatusKey] = useState(0)
    const [ebStatus, setEbStatus] = useState("")
    const [StatusDate, setStatusDate] = useState(new Date())
    const [remarks, setRemarks] = useState("")
    const [updateon, setUpdateon] = useState(new Date())

    const formData = {"bst_id":bstid, "bst_name":bstname, "pre_reading":preReading, "curr_reading":currReading, "billed_units":dfReading, "req_id":reqid, "bill_date":billdate, "bill_amount":billamount, "benif_name":benifname, "status":ebStatus, "status_date":StatusDate, "remarks":remarks, "update_on":updateon}
    const postData = () => {
        axios.post("https://sksinfo.000webhostapp.com/api-add/add-sify-epm.php", JSON.stringify(formData))
            .then(res => {
                if (res.data === "inserted") {
                    alert("Data Posted")
                    history.push("/bstlist")
                } else {
                    alert("Error: " + res.data)
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
                alert("Error: "+err)
            })
    }
    return (
        <div>
            <Navbar onClick={() => history.goBack()} />
            <br />
            <br />
            <div className="w3-container">
                <h3>New Request</h3>
                <div className="w3-cell-row">
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>BST Name:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <input type="text" className="w3-input" value={bstname} onChange={(e)=>setBstname(e.target.value)} />
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>BST ID:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <input type="text" className="w3-input" value={bstid} onChange={(e)=>setBstid(e.target.value)} />
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Req. ID:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <input type="text" className="w3-input" value={reqid} onChange={(e)=>setReqid(e.target.value)} />
                    </div>
                </div>
                <br />
                <div className="w3-cell-row">
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Previous Reading:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <input type="text" className="w3-input" value={preReading} onChange={(e)=>setPreReading(e.target.value)} />
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Current Reading:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <input type="text" className="w3-input" value={currReading} onChange={(e)=>setCurrReading(e.target.value)} />
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Billed Units:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <input type="text" className="w3-input" value={dfReading} onChange={(e)=>setDfReading(e.target.value)} />
                    </div>
                </div>
                <br />
                <div className="w3-cell-row">
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Bill Date:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <div>
                            <DatePicker
                                onChange={setBilldate}
                                value={billdate}
                            />
                        </div>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Bill Amount:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <input type="text" className="w3-input" value={billamount} onChange={(e)=>setBillamount(e.target.value)} />
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Benif Name:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <input type="text" className="w3-input" value={benifname} onChange={(e)=>setBenifname(e.target.value)} />
                    </div>
                </div>
                <br />
                <div className="w3-cell-row">
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Status:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <div className="w3-bar">
                        {status.map((s, key)=>(
                            <div key={key}>
                                {statusKey === key ? <button onClick={()=>setEbStatus(s)} className="w3-bar-item w3-button w3-green w3-small">{s}</button> :
                                    <button onClick={() => { setStatusKey(key);setEbStatus(s)}} className="w3-bar-item w3-button w3-white w3-small">{s}</button>}
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Status Date:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <div>
                            <DatePicker
                                onChange={setStatusDate}
                                value={StatusDate}
                            />
                        </div>
                    </div>
                </div>
                <div className="w3-cell-row">
                    <div className="w3-container w3-cell w3-mobile">
                        <label className="w3-text"><strong>Remarks:</strong></label>
                    </div>
                    <div className="w3-container w3-cell w3-mobile">
                        <textarea className="w3-input" value={remarks} onChange={(e)=>setRemarks(e.target.value)}></textarea>
                    </div>
                </div>
                <br />
                <h5 style={{textAlign:'center'}}><strong>Today is: </strong>{moment(updateon).format('LLL')}</h5>
                <br />
                <h3>{ebStatus}</h3>
                <div className="w3-cell-row">
                    <button className="w3-btn w3-blue w3-wide w3-block" onClick={postData}>Save</button>
                </div>
            </div>
        </div>
    )
}
export default NewEpm