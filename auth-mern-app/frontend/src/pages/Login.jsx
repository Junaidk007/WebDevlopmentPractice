import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useState } from "react";
import { handleError, handleSuccess } from "../util/Utility";

function Login() {
    let [loginInfo, setInfo] = useState({
        email: '',
        password: ""
    })

    let navigate = useNavigate();

    let handleChange = (e) => {
        let { name, value } = e.target;

        setInfo(prev => ({ ...prev, [name]: value }));
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password } = loginInfo;

        if (!email || !password) return handleError('All feilds are required');

        try {
            const api = "http://localhost:8080/auth/login"
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json();
            console.log(result)
            const { message, success, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => (navigate('/home')), 2000)
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
                email: '',
                password: ""
            })
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        value={loginInfo.email}
                        id="email"
                        type="email"
                        name="email"
                        autoFocus
                        placeholder="Enter your email...."
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        value={loginInfo.password}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password...."
                    />
                </div>
                <button type="submit">Log In</button>
                <span>Don't have an account ? <Link to='/signup'>Signup</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;