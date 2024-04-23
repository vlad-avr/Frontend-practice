import { Link } from "react-router-dom"
import "../pages/Entity.css"
import "../Home.css"
import axios from "../../api/axios"
import { useState } from "react"

const SET_URL = "/brigade"

const Crew = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');

    const [name, setName] = useState('');
    const [staticCrew, setStaticCrew] = useState(false);

    const makeRequest = async (field, value) => {
        const response = await axios.get(SET_URL, {
            params: {
                field: field,
                value: value
            }
        });
        console.log(JSON.stringify(response?.data));
        setData(response?.data);
    }

    const makeEdit = async (id) => {
        const editItem = data.find((item) => item.id === id);
        const response = await axios.put(SET_URL, JSON.stringify(editItem));
        setData(response?.data);
    }

    const makeDelete = async (field, value) => {
        const response = await axios.get(SET_URL, {
            params: {
                field: field,
                value: value
            }
        });
        setData(response?.data);
    }

    const makeCreate = async () => {
        const response = await axios.post(SET_URL, JSON.stringify({
            id: "",
            name: name,
            staticCrew: staticCrew
        }));
        setData(response?.data);
        setName("");
        setStaticCrew(false);
    }

    return (
        <section>
            <h2>Brigades</h2>
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
            <p>You can edit data about brigades</p>
            <div className="container">
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Static Crew</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Create new:</td>
                            <td><input type="text" onChange={(e) => setName(e.target.value)} value={name}></input></td>
                            <td><input type="checkbox" onChange={(e) => setStaticCrew(e.target.checked)} checked={staticCrew}></input></td>
                            <td><button onClick={() => makeCreate()}>Create</button></td>
                        </tr>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => {
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).name = e.target.value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input type="checkbox" 
                                    checked={item.staticCrew}
                                    onChange={(e) => {
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).staticCrew = e.target.checked;
                                        setData(newData);
                                    }}></input></td>
                                <td>
                                    <button onClick={() => makeEdit(item.id)}>Edit</button>
                                    <button onClick={() => makeDelete("delete", item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="home-page__button">
                <Link to="/admin_view">Back</Link>
            </div>
        </section>
    )
}

export default Crew