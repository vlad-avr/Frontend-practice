import { Link } from "react-router-dom"
import "../pages/Entity.css"
import "../Home.css"
import axios from "../../api/axios"
import { useState } from "react"

const SET_URL = "/race"

const EditPlane = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');

    const [departurePlace, setDeparturePlace] = useState('');
    const [arrivalPlace, setArrivalPlace] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [passengers, setPassengers] = useState('');
    const [luggageWeight, setLuggageWeight] = useState('');

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
            departurePlace: departurePlace,
            arrivalPlace: arrivalPlace,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            passengers: passengers,
            luggageWeight: luggageWeight
        }));
        setData(response?.data);
        setDeparturePlace("");
        setArrivalPlace("");
        setDepartureTime('');
        setArrivalTime('');
        setPassengers('');
        setLuggageWeight('');
    }

    const handleSeats = (e) => {
        const value = parseInt(e.target.value);
        setPassengers(isNaN(value) ? 0 : value);
    }

    const handleWeight = (e) => {
        const value = parseFloat(e.target.value);
        setLuggageWeight(isNaN(value) ? 0.0 : value);
    }

    return (
        <section>
            <h2>Races</h2>
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
            <p>You can edit data about races</p>
            <div className="container">
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Depart. Place</th>
                            <th>Depart. Time</th>
                            <th>Arrive. Place</th>
                            <th>Arrive. Time</th>
                            <th>Passengers</th>
                            <th>Luggage Weight</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Create new:</td>
                            <td><input type="text" onChange={(e) => setDeparturePlace(e.target.value)} value={departurePlace}></input></td>
                            <td><input type="datetime-local" onChange={(e) => setDepartureTime(e.target.value)} value={departureTime}></input></td>
                            <td><input type="text" onChange={(e) => setArrivalPlace(e.target.value)} value={arrivalPlace}></input></td>
                            <td><input type="datetime-local" onChange={(e) => setArrivalTime(e.target.value)} value={arrivalTime}></input></td>
                            <td><input type="number" onChange={handleSeats} value={passengers}></input></td>
                            <td><input type="number" onChange={handleWeight} value={luggageWeight}></input></td>
                            <td><button onClick={() => makeCreate()}>Create</button></td>
                        </tr>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><input
                                    type="text"
                                    value={item.departurePlace}
                                    onChange={(e) => {
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).departurePlace = e.target.value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input
                                    type="datetime-local"
                                    value={item.departureTime}
                                    onChange={(e) => {
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).departureTime = e.target.value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input
                                    type="text"
                                    value={item.arrivalPlace}
                                    onChange={(e) => {
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).arrivalPlace = e.target.value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input
                                    type="datetime-local"
                                    value={item.arrivalTime}
                                    onChange={(e) => {
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).arrivalTime = e.target.value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input
                                    type="number"
                                    value={item.passengers}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).passengers = isNaN(value) ? 0 : value;
                                        setData(newData);
                                    }}
                                /></td>
                                <td><input
                                    type="number"
                                    value={item.luggageWeight}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        const newData = [...data];
                                        newData.find((el) => el.id === item.id).luggageWeight = isNaN(value) ? 0.0 : value;
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