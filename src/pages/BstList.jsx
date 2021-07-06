import React,{useState, useEffect} from 'react'
//import Navbar from '../components/Navbar'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { SearchBar } from '../components/SearchBar'

const BstList = () => {
    const [BstData, setBstData] = useState([])
    const [Search, setSearch] = useState("")

    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get('https://sksinfo.000webhostapp.com/api/bst-data.php')
            setBstData(res.data)
        }
        fetchData()
    },[])
    let history = useHistory()
    const bstList = BstData.filter((item)=>{
        return item.bst_name.toLowerCase().includes(Search.toLowerCase())
    }).map((item, key) => <ul style={{ margin: 5 }} key={key} className="w3-ul w3-card-4"><li>BST Name: {item.bst_name}</li><li>BST ID: {item.bst_id}</li><li>City: {item.bst_city}</li><li>Owner: {item.provider}</li><li>Address: {item.bst_address}</li><li>Cooridnates: <a href={`https://www.google.com/maps/place/${item.latts},${item.longs}`}>{item.latts}, {item.longs}</a></li><li><Link to={`/ebm/${item.bst_id}/${item.bst_name}`}><button className="w3-btn w3-tiny w3-blue">EPM</button></Link><Link to={`/gis/${item.bst_name}`}><button className="w3-btn w3-tiny w3-green">GIS</button></Link></li></ul>)
    return (
        <div>
            <SearchBar onChange={(e)=>setSearch(e.target.value) } onClick={()=>history.goBack()}/>
            <br />
            <br />
            <h5 style={{textAlign:'center', fontWeight:'bold'}}>BST List</h5>
            <div className="w3-container">
                {bstList}
            </div>
        </div>
    )
}
export default BstList