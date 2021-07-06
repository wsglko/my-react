import React,{useState, useEffect} from 'react'
import { SearchBar } from '../components/SearchBar'
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const Snaps = () => {
    let history = useHistory()
    const [snapsData, setSnapsData] = useState([])
    const [search, setSearch] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('https://main-qovery--pqt2vjn0u4yghzyy-gtw.qovery.io/api/images')
            setSnapsData(res.data)
            //console.log(res.data)
        }
        fetchData()
    }, [])
    const snapList = snapsData.filter((item) => {
        return item.imgCat.toLowerCase().includes(search.toLowerCase()) || item.imgDetails.toLowerCase().includes(search.toLowerCase())
    }).map((item, key) => <div className="w3-card-4" key={key}><h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.imgCat}</h3><h5 style={{ textAlign: 'center' }}><b>Image Date:</b> {moment(item.imgDate).format('LL')}</h5><div className="w3-center"><img src={item.viewUrl} width="150" height="200" /></div><div className="w3-container w3-center"><p>{item.imgDetails}</p><h6><b>Last Updated:</b> {moment(item.updateOn).format('LL')}</h6></div></div>)
    return (
        <div>
            <SearchBar onChange={(e)=>setSearch(e.target.value) } onClick={()=>history.goBack()}/>
            <br/>
            <br/>
            <div className="w3-container">
                <h5 style={{ textAlign: 'center', fontWeight: 'bold' }}>Snaps Page</h5>
                <Link to="/newimg" className="w3-btn w3-green"><i className="fas fa-plus"></i></Link>
                {snapList}
            </div>
        </div>
    )
}

export default Snaps