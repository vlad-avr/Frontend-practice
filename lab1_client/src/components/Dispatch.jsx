import { Link } from "react-router-dom"
import "./Dispatch.css"

const Dispatch = () => {
    return (
        <section className="dispatch-page">
            <h1>Dispatch Page</h1>
            <p className="dispatch-page__description">You must have been assigned a Dispatch role.</p>
            <div className="dispatch-page__link">
                <Link to="/home" className="dispatch-page__link-text">Home</Link>
            </div>
        </section>
    )
}

export default Dispatch