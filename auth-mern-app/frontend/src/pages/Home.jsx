import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from "react";
import {handleSuccess } from "../util/Utility";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [data, setData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser')
        handleSuccess('User Loggedout');

        setTimeout(() => (navigate('/login')), 1000);
    }

    const fetchDetails = async () => {
        const api = "http://localhost:8080/"
        const response = await fetch(api, {
            headers: {'Authorization' : localStorage.getItem('token')}
        });
        const result = await response.json();
        // console.log(result)
        setData(result)
    }
    let {email, status, description} = data;

    useEffect(() => {
        fetchDetails();
    }, [])
    return ( 
        <div className="container">
            <h2>Hello:&nbsp;{loggedInUser}&nbsp;👋👋</h2> 
            <hr /><br />
            <div className="box">
                <p><b>Email:</b> {email}</p>
                <p><b>Status:</b> {status}</p>
                <p><b>Description:</b> {description}</p>
            </div>
            <br />
            <button onClick={handleLogout}>LogOut</button>
            <ToastContainer/>
        </div>
     );
}

export default Home;