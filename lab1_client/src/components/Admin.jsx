import { Link } from "react-router-dom"
import "./Admin.css"

const Admin = () => {
    return (
        <section className="admins-page">
            <h1>Admins Page</h1>
            <p className="admins-page__description">You must have been assigned an Admin role.</p>
            <div className="admins-page__link">
                <Link to="/home" className="admins-page__link-text">Home</Link>
            </div>
        </section>
    )
}

export default Admin