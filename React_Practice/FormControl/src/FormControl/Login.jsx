import { useState } from "react";

function Login() {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: ""
    })

    const handelChange = (e) => {
        setFormData((currData) => {
            return {...currData, [e.target.name]: e.target.value};
        })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
        name: "",
        password: "",
        email: ""
    })
    }

    return (
        <div>
            <form action="" onSubmit={handelSubmit}>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input type="email" id="email" name="email" onChange={handelChange} value={formData.email}  />
                </div>
                <br />
                <div>
                    <label htmlFor="name">Name</label><br />
                    <input type="text" id="name" name="name" onChange={handelChange} value={formData.name}  />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password</label><br />
                    <input type="password" id="password" name="password" onChange={handelChange} value={formData.password} />
                </div>
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;