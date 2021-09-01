import axios from "axios";
import React, { useState } from "react";
import { removeUserSession } from '../../utils/Common'

function Positions(props) {

    const [prices, setPricesData] = useState([])

    const handleLogout = () => {
        removeUserSession()
        props.history.push('logout')
    }
    const loadData = () => {
        fetch('http://localhost:1323/get-last-prices')
            .then(response => response.json)
            .then(data => {

            })
            .catch(err => console.error(props.url, err.toString()))
    }
    const handleGetPrices = () => {
        axios.get("http://localhost:1323/get-last-prices")
            .then(response => {
                console.log(response.data)
                setPricesData(response.data)
            })
            .catch(error => {

            })

    }

    return (
        <div>
            {prices.map((item, i) => {
                return <li>{item.symbol}</li>
            })}
            Welcome User!<br /><br />
            <input type="button" onClick={handleLogout} value="Logout" />
            <input type="button" onClick={handleGetPrices} value="get prices" />
        </div>
    )
}

export default Positions