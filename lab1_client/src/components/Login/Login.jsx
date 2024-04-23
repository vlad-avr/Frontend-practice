
import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Login.css"
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = '/auth'

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg();
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        console.log(pwd)
        const user_obj = {
            login: user,
            password: pwd
        }
        await axios.post(LOGIN_URL, JSON.stringify(user_obj), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(JSON.stringify(response?.data));
            setAuth({ user, pwd })
            setUser('');
            setPwd('');
            setSuccess(true);
            //navigate(from, { replace: true });
        })
            .catch(err => {
                console.error('Error:', err); // Handle any errors
                if (!err?.response) {
                    setErrMsg("No Response");
                }
                else if (err.response?.status == 400) {
                    setErrMsg("Missing Username or Password");
                }
                else if (err.response?.status == 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg("Login failed");
                }
                errRef.current.focus();
            });
    }

    return (
        <>{success ? (
            <section>
                <h1>Logged in Successfully!</h1>
                <Link to="/home">Go to the Home page</Link>
            </section>
        ) : (
            <div>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                    <button>Sign in</button>
                </form>
            </div>
        )}
        </>
    )
}

export default Login