import { Link } from "react-router-dom";
import '../Home.css';

const AdminView = () =>{

    return (
        <div className="home-page">
            <h2>Welcome to Viewing page</h2>
            <div className="home-page__links">
                <Link to="/crew_edit" className="home-page__link">Edit Crew data</Link>
                <Link to="/brigade_edit" className="home-page__link">Edit Brigade data</Link>
                <Link to="/plane_edit" className="home-page__link">Edit Planes data</Link>
                <Link to="/race_edit" className="home-page__link">Edit Races data</Link>
                <Link to="/flight_edit" className="home-page__link">Edit Flights data</Link>
            </div>
            <div className="home-page__button">
                <Link to="/home">Back</Link>
            </div>
        </div>
    );
}

export default AdminView