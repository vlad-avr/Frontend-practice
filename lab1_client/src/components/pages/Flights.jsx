import { Link } from "react-router-dom"
import "./Entity.css"
import "../Home.css"
import axios from "../../api/axios"
import { useState } from "react"
import getHeaderConfig from "../hooks/Config"
const FLIGHT_URL = "/flight";

const Flights = () => {
    const [data, setData] = useState([]);
    const [id, setID] = useState('');

    const config = getHeaderConfig();

    const makeRequest = async (field, value) => {
        const response = await axios.get(FLIGHT_URL, {
            params: {
                field: field,
                value: value
            },
            headers: config.headers
        });
        console.log(JSON.stringify(response?.data));
        setData(response?.data);
    }


    return (
        <section>
            <h2>Flights</h2>
            <p>You can query data about flights</p>
            <div className="container">
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Plane ID</th>
                            <th>Race ID</th>
                            <th>Brigade ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.planeId}</td>
                                <td>{item.raceId}</td>
                                <td>{item.brigadeId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="queries">
                <div>
                    <label htmlFor="byID">Query by ID</label>
                    <input type="text" id="byID" onChange={(e) => setID(e.target.value)} value={id} />
                    <button onClick={() => makeRequest("id", id)}>Execute Query</button>
                </div>
                <div>
                    <label htmlFor="all">Query All</label>
                    <button id="all" onClick={() => makeRequest("all", "all")}>Execute Query</button>
                </div>
            </div>
            <div className="home-page__button">
                <Link to="/view">Back</Link>
            </div>
        </section>
    )
}

export default Flights