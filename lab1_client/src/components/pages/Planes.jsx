import { Link } from "react-router-dom"
import "./Entity.css"
import "../Home.css"
import axios from "../../api/axios"
import { useState } from "react"
const PLANE_URL = "/plane"

const Planes = () => {
    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [model, setModel] = useState('');

    const makeRequest = async (field, value) => {
        const response = await axios.get(PLANE_URL, {
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
            <h2>Planes</h2>
            <p>You can query data about planes</p>
            <div className="container">
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Model</th>
                            <th>Seats</th>
                            <th>Max weight</th>
                            <th>Flight time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.model}</td>
                                <td>{item.passengerSeats}</td>
                                <td>{item.maxLuggage}</td>
                                <td>{item.maxFlightInMins}</td>
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
                    <label htmlFor="byName">Query by Model</label>
                    <input type="text" id="byName" onChange={(e) => setModel(e.target.value)} value={model} />
                    <button onClick={() => makeRequest("model", model)}>Execute Query</button>
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

export default Planes