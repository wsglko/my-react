import React from 'react'
//import moment from 'moment'

const Towers = () => {
    return (
        <div>
            <hr style={{borderWidth:2,borderColor:"#000"}}/>
            <h3 id="tower">Tower Page</h3>
            <div>
                <input type="text" className="w3-input" placeholder="Link ID"/>
                <textarea className="w3-input" placeholder="Customer Name and Details"></textarea>
                <input type="text" className="w3-input" placeholder="Mast Details"/>
                <input type="date" className="w3-input" />
                <select className="w3-input">
                    <option value="" select="selected">--Vendor--</option>
                    <option value="GMI">GMI</option>
                    <option value="JYA">JYA</option>
                </select>
            </div>

        </div>
    )
}
export default Towers