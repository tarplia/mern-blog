import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
    // baseURL: "https://merndailyblog.herokuapp.com/",
    baseURL: "http://localhost:8080/",
});

async function loginUser(credentials) {
    const encodedUsername = encodeURIComponent(credentials.username);
    const encodedPassword = encodeURIComponent(credentials.password);

    const input = `username=${encodedUsername}&password=${encodedPassword}`;

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    return api.post("/login", input, config)
    .then((res) => {
        return res.data
    })
    .catch((err) => console.log(err));

    // return fetch("http://localhost:8080/login", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: `username=${encodedUsername}&password=${encodedPassword}`,
    // })
    //     .then((response) => response.json())
    //     .catch((err) => console.log(err));
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

        if (token !== undefined) {
            props.handleToken(token);
            props.fetchHome(token);
            navigate("/");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>Login</h3>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-3">
                        <label htmlFor="username">Email</label>
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => setUserName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="d-grid">
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
