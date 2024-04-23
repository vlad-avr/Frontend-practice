import { Link } from "react-router-dom"
import "../pages/Entity.css"
import "../Home.css"
import axios from "../../api/axios"
import { useState } from "react"
import getHeaderConfig from "../hooks/Config"

const SET_URL = "/plane"

const EditPlane = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');

    const [model, setModel] = useState('');
    const [passengerSeats, setPassengerSeats] = useState();
    const [maxLuggage, setMaxLuggage] = useState();
    const [maxFlightInMins, setMaxFlightInMins] = useState();

    const config = getHeaderConfig();

    const makeRequest = async (field, value) => {
        const response = await axios.get(SET_URL, {
            params: {
                field: field,
                value: value
            },
            headers: config.headers
        });
        setData(response?.data);
    }

    const makeEdit = async (id) => {
        const editItem = data.find((item) => item.id === id);
        const response = await axios.put(SET_URL, JSON.stringify(editItem), config);
        setData(response?.data);
    }

    const makeDelete = async (field, value) => {
        const response = await axios.get(SET_URL, {
            params: {
                field: field,
                value: value
            },
            headers: config.headers
        });
        setData(response?.data);
    }

    const makeCreate = async () => {
        const response = await axios.post(SET_URL, JSON.stringify({
            id: "",
            model: model,
            passengerSeats: passengerSeats,
            maxLuggage: maxLuggage,
            maxFlightInMins: maxFlightInMins
        }), config);
        setData(response?.data);
        setModel("");
        setPassengerSeats();
        setMaxLuggage();
        setMaxFlightInMins();
    }

    const handleSeats = (e) => {
        const value = parseInt(e.target.value);
        setPassengerSeats(isNaN(value) ? 0 : value);
    }

    const handleFlight = (e) => {
        const value = parseInt(e.target.value);
        setMaxFlightInMins(isNaN(value) ? 0 : value);
    }

    const handleWeight = (e) => {
        const value = parseFloat(e.target.value);
        setMaxLuggage(isNaN(value) ? 0.0 : value);
    }

    return (
        <section>
            <h2>Planes</h2>
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
            <p>You can edit data about planes</p>
            <div className="container">
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Model</th>
                            <th>Seats</th>
                            <th>Max Weight</th>
                            <th>Max Flight time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Create new:</td>
                            <td><input type="text" onChange={(e) => setModel(e.target.value)} value={model}></input></td>
                            <td><input type="number" onChange={handleSeats} value={passengerSeats}></input></td>
                            <td><input type="number" onChange={handleWeight} value={maxLuggage}></input></td>
                            <td><input type="number" onChange={handleFlight} value={maxFlightInMins}></input></td>
                            <td><button onClick={() => makeCreate()}>Create</button></td>
                        </tr>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><input
                                    type="text"
                                    value={item.model}
                                    onChange={(e) => {
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).model = e.target.value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input
                                    type="number"
                                    value={item.passengerSeats}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).passengerSeats = isNaN(value) ? 0 : value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input
                                    type="number"
                                    value={item.maxLuggage}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).maxLuggage = isNaN(value) ? 0.0 : value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input
                                    type="number"
                                    value={item.maxFlightInMins}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).maxFlightInMins = isNaN(value) ? 0 : value;
                                        setData(newData);
                                    }}
                                /></td>
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

export default EditPlane