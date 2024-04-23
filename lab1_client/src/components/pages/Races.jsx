import { Link } from "react-router-dom"
import "./Entity.css"
import "../Home.css"
import axios from "../../api/axios"
import { useState } from "react"
const RACE_URL = "/race";

const Races = () => {
    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [depart, setDepart] = useState('');
    const [arrival, setArrival] = useState('');

    const makeRequest = async (field, value) => {
        const response = await axios.get(RACE_URL, {
            params: {
                field: field,
                value: value
            }
        });
        console.log(JSON.stringify(response?.data));
        setData(response?.data);
    }


    return (
        <section>
            <h2>Races</h2>
            <p>You can query data about races</p>
            <div className="container">
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Departure Place</th>
                            <th>Departure Time</th>
                            <th>Arrival Place</th>
                            <th>Arrival Time</th>
                            <th>Passengers</th>
                            <th>Luggage Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.departurePlace}</td>
                                <td>{item.departureTime}</td>
                                <td>{item.arrivalPlace}</td>
                                <td>{item.arrivalTime}</td>
                                <td>{item.passengers}</td>
                                <td>{item.luggageWeight}</td>
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
                    <label htmlFor="byDep">Query by Departure Place</label>
                    <input type="text" id="byDep" onChange={(e) => setDepart(e.target.value)} value={depart} />
                    <button onClick={() => makeRequest("departure", depart)}>Execute Query</button>
                </div>
                <div>
                    <label htmlFor="byArr">Query by Arrival Place</label>
                    <input type="text" id="byArr" onChange={(e) => setArrival(e.target.value)} value={arrival} />
                    <button onClick={() => makeRequest("arrival", arrival)}>Execute Query</button>
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

export default Races