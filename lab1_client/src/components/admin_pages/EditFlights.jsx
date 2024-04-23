import { Link } from "react-router-dom"
import "../pages/Entity.css"
import "../Home.css"
import axios from "../../api/axios"
import { useState } from "react"

const SET_URL = "/flight"

const EditFlight = () => {

    const [data, setData] = useState([]);
    const [raceIds, setRaceIds] = useState([]);
    const [planeIds, setPlaneIds] = useState([]);
    const [brigadeIds, setBrigadeIds] = useState([]);

    const [id, setID] = useState('');

    const [raceId, setRaceId] = useState('');
    const [planeId, setPlaneId] = useState('');
    const [brigadeId, setBrigadeId] = useState('');

    const getIds = async() => {
        const raceIdsResp = await axios.get(SET_URL, {
            params: {
            field: "ids",
            value: "race"
            }
        });
        console.log(JSON.stringify(raceIdsResp?.data));
        setRaceIds(raceIdsResp?.data);
        const planeIdsResp = await axios.get(SET_URL, {
            params: {
            field: "ids",
            value: "plane"
            }
        });
        console.log(JSON.stringify(planeIdsResp?.data));
        setPlaneIds(planeIdsResp?.data);
        const brigadeIdsResp = await axios.get(SET_URL, {
            params: {
            field: "ids",
            value: "brigade"
            }
        });
        console.log(JSON.stringify(brigadeIdsResp?.data));
        setBrigadeIds(brigadeIdsResp?.data);
    }

    const makeRequest = async (field, value) => {
        const response = await axios.get(SET_URL, {
            params: {
                field: field,
                value: value
            }
        });
        console.log(JSON.stringify(response?.data));
        setData(response?.data);
        getIds();
    }

    const makeEdit = async (id) => {
        const editItem = data.find((item) => item.id === id);
        const response = await axios.put(SET_URL, JSON.stringify(editItem));
        setData(response?.data);
        getIds();
    }

    const makeDelete = async (field, value) => {
        const response = await axios.get(SET_URL, {
            params: {
                field: field,
                value: value
            }
        });
        setData(response?.data);
        getIds();
    }

    const makeCreate = async () => {
        const response = await axios.post(SET_URL, JSON.stringify({
            id: "",
            raceId: raceId,
            planeId: planeId,
            brigadeId: brigadeId
        }));
        setData(response?.data);
        getIds();
        setBrigadeId('');
        setRaceId('');
        setPlaneId('');
    }

    return (
        <section>
            <h2>Flights</h2>
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
            <p>You can edit data about flights</p>
            <div className="container">
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Race ID</th>
                            <th>Plane ID</th>
                            <th>Brigade ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Create new:</td>
                            <td><select value={raceId} onChange={(e) => setRaceId(e.target.value)}>
                                <option value=''></option>
                                {raceIds?.map((id) => (
                                    <option value={id}>{id}</option>
                                ))}
                                </select>
                            </td>
                            <td><select value={planeId} onChange={(e) => setPlaneId(e.target.value)}>
                                <option value=''></option>
                                {planeIds?.map((id) => (
                                    <option value={id}>{id}</option>
                                ))}
                                </select>
                            </td>
                            <td><select value={brigadeId} onChange={(e) => setBrigadeId(e.target.value)}>
                                <option value=''></option>
                                {brigadeIds?.map((id) => (
                                    <option value={id}>{id}</option>
                                ))}
                                </select>
                            </td>
                            <td><button onClick={() => makeCreate()}>Create</button></td>
                        </tr>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><select value={item.raceId} onChange={(e) => {
                                    const newData = [...data];
                                    newData.find((el) => el.id === item.id).raceId = e.target.value; 
                                    // const oldId = flight.raceId;
                                    // flight.raceId = e.target.value;
                                    // setRaceIds(raceIds.filter(item => item !== flight.raceId).push(oldId));
                                    setData(newData);
                                }}>
                                <option value=''></option>
                                {raceIds?.map((id) => (
                                    <option value={id}>{id}</option>
                                ))}
                                </select></td>
                                <td><select value={item.planeId} onChange={(e) => {
                                    const newData = [...data];
                                    newData.find((el) => el.id === item.id).planeId = e.target.value
                                    // const flight = newData.find((el) => el.id === item.id); 
                                    // const oldId = flight.planeId;
                                    // flight.planeId = e.target.value;
                                    // setPlaneIds(planeIds.filter(item => item !== flight.planeId).push(oldId));
                                    setData(newData);
                                }}>
                                <option value=''></option>
                                {planeIds?.map((id) => (
                                    <option value={id}>{id}</option>
                                ))}
                                </select></td>
                                <td><select value={item.brigadeId} onChange={(e) => {
                                    const newData = [...data];
                                    newData.find((el) => el.id === item.id).brigadeId = e.target.value
                                    // const flight = newData.find((el) => el.id === item.id); 
                                    // const oldId = flight.brigadeId;
                                    // flight.brigadeId = e.target.value;
                                    // setBrigadeIds(brigadeIds.filter(item => item !== flight.brigadeId).push(oldId));
                                    setData(newData);
                                }}>
                                <option value=''></option>
                                {brigadeIds?.map((id) => (
                                    <option value={id}>{id}</option>
                                ))}
                                </select></td>
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

export default EditFlight