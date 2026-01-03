import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from "react";
import {handleSuccess } from "../util/Utility";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
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
    return ( 
        <div className="container">
            <h2>Hello:&nbsp;{loggedInUser}&nbsp;👋👋</h2>
            <br />
            <button onClick={handleLogout}>LogOut</button>
            <ToastContainer/>
        </div>
     );
}

export default Home;