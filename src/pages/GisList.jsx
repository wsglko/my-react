import React,{useState,useEffect} from 'react'
import { useHistory  } from 'react-router-dom'
import axios from 'axios'
import {SearchBar} from '../components/SearchBar'

function GisList(){
  const [gisData,setGisData] = useState([]);
  const [Search, setSearch] = useState("");
  useEffect(()=> {
    const fethData = async () => {
      const res = await axios.get("https://wsglko.000webhostapp.com/api/gis-data.php");
      setGisData(res.data);
    }
    fethData()
  },[])
  let history = useHistory()
  const gisList = gisData.filter((item)=>{
    return item.bst.toLowerCase().includes(Search.toLowerCase()) || item.apip.includes(Search)
  }).map((item,key)=><div className="w3-card-4" key={key.toString()}><header className="w3-container-blue"><h4 style={{textAlign:"center"}}><strong>AP IP:</strong> {item.apip}</h4></header><div className="w3-container"><ul className="w3-ul"><li>BST:{item.bst}</li><li>City: {item.city}</li><li>Frequency: {item.freqch}</li><li>Channel BW: {item.chbw} <b><i>Mhz</i></b></li><li>Hardware: {item.aphard}</li><li>Azimuch: {item.azimuth} <b><i>Deg.</i></b></li><li>SSID: {item.sysname}</li><li>Serial No.: {item.apsrno}</li><li>Tx. Pwr.: {item.txpwr} <b><i>dBM</i></b></li><li>Distance: {item.distance} <b><i>Km</i></b></li><li>Data Rate: {item.drate} <b><i>MCS</i></b></li><li>Polarization: {item.polar}</li><li>Switch Port: {item.swport}</li><li>AES Pwd: {item.aespass}</li><li>Updated On: {item.update_date}</li><li><button className="w3-btn w3-blue w3-tiny"><i className="fas fa-edit"></i></button>&nbsp;<button className="w3-btn w3-red w3-tiny"><i className="fa fa-trash"></i></button></li></ul></div></div>)
  return (
    <div>
    <SearchBar onChange={(e)=>setSearch(e.target.value)} onClick={()=>history.goBack()}/>
      <br/>
      <br />
      <h5 style={{textAlign:'center', fontWeight:'bold'}}>GIS Data</h5>
    <div className="w3-container">
    {gisList}
      </div>
    </div>
  )
}

export default GisList
