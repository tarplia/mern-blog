import React, { useState } from "react";
import {
    useNavigate,
  } from 'react-router-dom';

async function loginUser(credentials) {
    const encodedUsername = encodeURIComponent(credentials.username);
    const encodedPassword = encodeURIComponent(credentials.password);

    return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodedUsername}&password=${encodedPassword}`,
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

function Login(props) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password,
        });
        props.setToken(token);
        navigate('/compose');
    };

    return (
        <div
            className={
                props.activeTab === "login"
                    ? "compose-form appear"
                    : "compose-form hidden"
            }
        >
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="input-form">
                        <label htmlFor="username">Email</label>
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => setUserName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="input-form">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
