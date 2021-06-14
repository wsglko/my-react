import React from 'react'
import Navbar from '../components/Navbar'
import {SearchBar} from '../components/SearchBar'
import axios from 'axios'
import './mycss.css'

const TestSearchBar = () => {
    const [Search, setSearch] = React.useState("");
    const [GisData, setGisData] = React.useState([]);

    React.useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get("https://wsglko.000webhostapp.com/api/gis-data.php");
            setGisData(res.data);
        }
        fetchData();
    },[])
    const filteredGisList = GisData.filter((item)=>{
        return(
            item.bst.toLowerCase().includes(Search.toLowerCase())
        )
    }).map((item,key)=><div key={key.toString()}>{item.bst}</div>)
    return (
        <div>
        <Navbar/>
        <br/>
        <br/>
        <div className="sticky"><SearchBar onChange={(e)=>setSearch(e.target.value)}/></div>
        
        <div className="w3-container">
            <p>This page is for testing purpose only.</p>
        </div>
        <div>{filteredGisList}</div>
        </div>
    )
}

export default TestSearchBar;
