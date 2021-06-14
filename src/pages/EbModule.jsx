import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link  } from 'react-router-dom'
import Navbar from '../components/Navbar'
import moment from 'moment'
import axios from 'axios'

const EbModule = () => {
    const {bstID,bstName} = useParams()
    const [data, setData] = useState([])
    const Search = { "searchBst": "yes", "searchText": bstID }
    let history = useHistory()
    useEffect(() => {
        axios.post("https://sksinfo.000webhostapp.com/api/sify-epm.php", JSON.stringify(Search))
            .then(res => {
                if (res.data == null) {
                    alert("No Data found")
                } else {
                    setData(res.data)
                    //console.table(res.data)
                }
            })
            .catch(err => {
                console.log(err)
                alert("Error: "+err)
            })
    }, [])
    const mydata = data.map((item, key) => {
        return <tr key={key}><td>{item.bst_name}</td><td>{moment(item.bill_date).format('LL')}</td><td>Rs. {item.bill_amount}</td><td><button className={item.status==='PENDING'?"w3-btn w3-blue":(item.status === 'PAID'?"w3-btn w3-green":(item.status === 'REJECT'?"w3-btn w3-red":"w3-btn w3-yellow"))}>{item.status}</button></td></tr>
    })
    return (
        <div>
            <Navbar onClick={()=>history.goBack()} />
            <br />
            <br/>
            <div className="w3-container">
                <h5 style={{ textAlign: 'center', fontWeight: 'bold' }}>EB Module</h5>
                <Link to={`/newepm/${bstID}/${bstName}`} className="w3-btn w3-blue">New</Link>
                <div className="w3-responsive">
                    <table className="w3-table-all">
                        <thead>
                            <tr>
                                <th>BST</th>
                                <th>Bill Date</th>
                                <th>Bill Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mydata}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EbModule
/*
<div>
                <input type="text" className="w3-input" placeholder="BST Name" value={BstName} onChange={(e)=>setBstName(e.target.value)}/>
                <input type="date" className="w3-input" placeholder="Bill Date" value={BillDate} onChange={(e)=>setBillDate(e.target.value)}/>
                <input type="text" className="w3-input" placeholder="Amount" value={Amount} onChange={(e)=>setAmount(e.target.value)}/>
                <input type="text" className="w3-input" placeholder="Status" value={Status} onChange={(e)=>setStatus(e.target.value)}/>
                <button type="submit" className="w3-btn w3-green w3-small">Save</button>
            </div>
*/