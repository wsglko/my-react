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
import swal from 'sweetalert';

const Epm = () => {
    let history = useHistory
    const [txtSearch, setTxtSearch] = useState("")
    const [search, setSearch] = useState("")
    const [empList, setEmpList] = useState([])
    const [scat, setScat] = useState(['PENDING', 'PAID', 'REJECT', 'NOT-RAISED'])
    const [scatKey, setScatKey] = useState(0)
    const [show, setShow] = useState(false)
    const [StatusDate, setStatusDate] = useState(new Date())
    const [modal, setModal] = useState("none");
    const showModal = () => setModal("block");
    const hideModal = () => setModal("none");
    useEffect(() => {
        //const searchTxt = { "action": "reqAllData" }
        //axios.post("https://sksinfo.000webhostapp.com/api/sify-epm.php",JSON.stringify(searchTxt))
        axios.post("https://sksinfo.000webhostapp.com/api/sify-epm.php", JSON.stringify({ "action": "reqAllData" }))
            .then(res => {
                if (res.data === null) {
                    //console.log(res.data);
                    setEmpList(null);
                    toast.warning("Data not found based on your Search criteria...");
                } else {
                    //console.log(res.data);
                    setEmpList(res.data);
                    toast.success("Data Found");
                }
            }).catch(err => {
                console.warn(err)
            })
    }, [])
    const deleteRecord = (value) => {
        swal({
            title: "Are you sure ?",
            text: "Once deleted, you will not able to recover this data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post("https://sksinfo.000webhostapp.com/api-delete/sify-epm.php", JSON.stringify({"action":"deleteData", "id": value }))
                        .then(res => {
                            if (res.data === "deleted") {
                                toast.success("Record Deleted");
                                history.push("/epm");
                            } else {
                                toast.warning("Please try again later");
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    swal("record deleted", { icon: "success", });
                } else {
                    swal("Thanks!, your data is safe");
                }
            });
    }

    const myData = search === "" && txtSearch === "" ? empList.map((epm) => { return <tr key={epm.id}><td>{epm.bst_name}</td><td>{epm.curr_reading}</td><td>{epm.billed_units}</td><td>{moment(epm.bill_date).format('LL')}</td><td><b>Rs.</b>{epm.bill_amount}</td><td><button onClick={(e) => setShow(true)} className={epm.status === 'PENDING' ? "w3-btn w3-blue" : (epm.status === 'PAID' ? "w3-btn w3-green" : (epm.status === 'REJECT' ? "w3-btn w3-red" : "w3-btn w3-yellow"))}>{epm.status}</button></td><td><button onClick={() => deleteRecord(epm.id)} className="w3-btn w3-tiny w3-red"><i className="fa fa-trash"></i></button></td></tr> }) : empList.filter((item) => { return item.status.includes(search) && item.bst_name.toLowerCase().includes(txtSearch.toLowerCase()) }).map((epm) => { return <tr key={epm.id}><td>{epm.bst_name}</td><td>{epm.curr_reading}</td><td>{epm.billed_units}</td><td>{moment(epm.bill_date).format('LL')}</td><td><b>Rs.</b>{epm.bill_amount}</td><td><button onClick={(e) => setShow(true)} className={epm.status === 'PENDING' ? "w3-btn w3-blue" : (epm.status === 'PAID' ? "w3-btn w3-green" : (epm.status === 'REJECT' ? "w3-btn w3-red" : "w3-btn w3-yellow"))}>{epm.status}</button></td><td><button onClick={() => deleteRecord(epm.id)} className="w3-btn w3-tiny w3-red"><i className="fa fa-trash"></i></button></td></tr> })
    return (
        <div>
            <Navbar onClick={() => history.goBack()} />
            <br />
            <br />
            <div className="w3-container">
                <br/>
                <button onClick={showModal} style={{margin:5}} className="w3-btn w3-tiny w3-green"><i className="fas fa-plus"></i></button>
                <div className="w3-row w3-section">
                    <div className="w3-col" style={{width:50}}><i className="w3-xlarge fas fa-search"></i></div>
                    <div className="w3-rest"><input value={txtSearch} onChange={(e)=>setTxtSearch(e.target.value)} type="text" className="w3-input" placeholder="Search here.." /></div>
                </div>
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
                <div className="w3-modal" style={{display:modal}}>
                    <div className="w3-modal-content w3-card-4 w3-animate-zoom">
                        <header className="w3-container w3-khaki">
                            <span className="w3-button w3-display-topright" onClick={hideModal}>&times;</span>
                            <h5>Raise new Bill</h5>
                        </header>
                        <div className="w3-container">
                            <form className="w3-container">
                                <label className="w3-text-khaki">BST Name</label>
                                <select className="w3-select">
                                    <option value="" disabled selected>--Select BSTN--</option>
                                </select>
                                <label className="w3-text-khaki">BST ID:</label>
                                <input type="text" className="w3-input" />
                            </form>
                        </div>
                        <footer className="w3-container w3-khaki">
                            <button style={{margin:10}} className="w3-btn w3-tiny w3-green">Save</button>
                            <button style={{margin:10}} onClick={hideModal} className="w3-btn w3-tiny w3-gray">Cancel</button>
                        </footer>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
    
}
export default Epm