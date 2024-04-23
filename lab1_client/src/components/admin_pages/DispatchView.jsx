import { Link } from "react-router-dom";
import '../Home.css';

const DispatchView = () =>{

    return (
        <div className="home-page">
            <h2>Welcome to Dispatch page</h2>
            <div className="home-page__links">
                <Link to="/crew_dispatch" className="home-page__link">Dispatch Crew</Link>
                <Link to="/brigade_edit" className="home-page__link">Edit Brigade data</Link>
            </div>
            <div className="home-page__button">
                <Link to="/home">Back</Link>
            </div>
        </div>
    );
}

export default DispatchView