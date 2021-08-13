import React,{useState, useEffect} from 'react'
//import { SearchBar } from '../components/SearchBar'
import Navbar from '../../components/Navbar'
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Modal from '../../components/Modal'
import DatePicker from 'react-date-picker'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Epm = () => {
    let history = useHistory
    const [search, setSearch] = useState()
    const [empList, setEmpList] = useState([])
    const [scat, setScat] = useState(['PENDING', 'PAID', 'REJECT', 'NOT-RAISED'])
    const [scatKey, setScatKey] = useState(0)
    const [show, setShow] = useState(false)
    const [StatusDate, setStatusDate] = useState(new Date())
    useEffect(() => {
        //const searchTxt = { "action": "reqAllData" }
        //axios.post("https://sksinfo.000webhostapp.com/api/sify-epm.php",JSON.stringify(searchTxt))
        axios.post("https://sksinfo.000webhostapp.com/api/sify-epm.php",JSON.stringify({"action":"reqAllData"}))
            .then(res => {
                if (res.data == null) {
                    toast.warning("Data not found based on your Search criteria...")
                } else {
                    setEmpList(res.data)
                    toast.success("Data Found");
                }
            }).catch(err => {
                console.warn(err)
            })
    }, [])
    const deleteRecord = (value) => {
        //alert("Value is " + value)
        axios.post("https://sksinfo.000webhostapp.com/api-delete/delete-epm.php", JSON.stringify({ "id": value }))
            .then(res => {
                if (res.data == "deleted") {
                    toast.success("Record Deleted")
                    history.push("/epm")
                } else {
                    toast.warning("Please try again later")
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const myData = search == null ? empList.map((epm) => { return <tr key={epm.id}><td>{epm.bst_name}</td><td>{epm.curr_reading}</td><td>{epm.billed_units}</td><td>{moment(epm.bill_date).format('LL')}</td><td><b>Rs.</b>{epm.bill_amount}</td><td><button onClick={(e)=>setShow(true)} className={epm.status==='PENDING'?"w3-btn w3-blue":(epm.status === 'PAID'?"w3-btn w3-green":(epm.status === 'REJECT'?"w3-btn w3-red":"w3-btn w3-yellow"))}>{epm.status}</button></td><td><button onClick={()=>deleteRecord(epm.id)} className="w3-btn w3-tiny w3-red"><i className="fa fa-trash"></i></button></td></tr> }) : empList.filter((item)=>{return item.status.includes(search)}).map((epm) => { return <tr key={epm.id}><td>{epm.bst_name}</td><td>{epm.curr_reading}</td><td>{epm.billed_units}</td><td>{moment(epm.bill_date).format('LL')}</td><td><b>Rs.</b>{epm.bill_amount}</td><td><button onClick={(e)=>setShow(true)} className={epm.status==='PENDING'?"w3-btn w3-blue":(epm.status === 'PAID'?"w3-btn w3-green":(epm.status === 'REJECT'?"w3-btn w3-red":"w3-btn w3-yellow"))}>{epm.status}</button></td><td><button onClick={()=>deleteRecord(epm.id)} className="w3-btn w3-tiny w3-red"><i className="fa fa-trash"></i></button></td></tr> })
    return (
        <div>
            <Navbar onClick={() => history.goBack()} />
            <br />
            <br />
            <div className="w3-container">
                <h5>Pending EPM Requests</h5>
                <div className="w3-cell-row">
                    <div className="w3-cell w3-mobile">
                        <div className="w3-bar">
                            {scat.map((s, key) => (
                                <div key={key}>
                                    {scatKey === key ? <button onClick={() => setSearch(s)} className= { search==='PENDING'?"w3-bar-item w3-btn w3-small w3-blue":(search==='PAID'?"w3-bar-item w3-btn w3-small w3-green":(search==='REJECT'?"w3-bar-item w3-btn w3-small w3-red":"w3-bar-item w3-btn w3-small w3-yellow"))}>{s}</button> : <button onClick={() => { setScatKey(key);setSearch(s)}} className="w3-bar-item w3-btn w3-small w3-light-grey">{s}</button>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <br />
                <div className="w3-responsive">
                    <div className="w3-table-all">
                        <thead>
                            <tr>
                                <th>BST</th>
                                <th>Last Reading</th>
                                <th>Billed Units</th>
                                <th>Bill Date</th>
                                <th>Bill Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData}
                        </tbody>
                    </div>
                </div>
                <Modal show={show} handleClose={(e)=>setShow(false)}>
                    <p>Modal</p>
                </Modal>
                <ToastContainer />
            </div>
        </div>
    )
    
}
export default Epm