import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from "../util/Utility";

function Signup() {
    let [signupInfo, setInfo] = useState({
        username: "",
        email: '',
        password: ""
    })

    let navigate = useNavigate();

    let handleChange = (e) => {
        let { name, value } = e.target;
        let info = { ...signupInfo };
        info[name] = value;

        setInfo(info);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = signupInfo;

        if (!username || !email || !password) return handleError('All feilds are required');

        try {
            const api = "http://localhost:8080/auth/signup"
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const {message, success, error} = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => (navigate('/login')), 2000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details)
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err)
        } finally {
            setInfo({
                username: "",
                email: '',
                password: ""
            })
        }

    }

    return (
        <div className="container">
            <h1>Signup</h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                        onChange={handleChange}
                        value={signupInfo.username}
                        id="username"
                        type="text"
                        name="username"
                        autoFocus
                        placeholder="Enter your username...."
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        value={signupInfo.email}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email...."
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        value={signupInfo.password}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password...."
                    />
                </div>
                <button type="submit">Sign Up</button>
                <span>Already have an account ? <Link to='/login'>Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;