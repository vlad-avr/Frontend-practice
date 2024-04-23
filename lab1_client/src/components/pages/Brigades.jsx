import { Link } from "react-router-dom"
import "./Entity.css"
import "../Home.css"
import axios from "../../api/axios"
import { useState } from "react"
const BRIGADE_URL = "/brigade";

const Brigades = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [name, setName] = useState('');

    const makeRequest = async (field, value) => {
        const response = await axios.get(BRIGADE_URL, {
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
            <h2>Brigades</h2>
            <p>You can query data about brigades</p>
            <div className="container">
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>isStatic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.isStatic}</td>
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
                    <label htmlFor="byName">Query by Name</label>
                    <input type="text" id="byName" onChange={(e) => setName(e.target.value)} value={name} />
                    <button onClick={() => makeRequest("name", name)}>Execute Query</button>
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

export default Brigades