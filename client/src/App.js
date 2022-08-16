import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";

import Header from "./components/Header";
import Compose from "./components/Compose";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./components/Login";

import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

const api = axios.create({
    baseURL: "https://merndailyblog.herokuapp.com/",
    // baseURL: "http://localhost:8080/",
});

function App() {
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
      const token = getToken();
      fetchHome(token);
    },[]);

    const fetchBlogPost = (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        api.get("/api", config)
            .then((res) => {
                const data = res.data;
                setPosts(data);
                console.log("Data is retrieved!");
            })
            .catch(() => {
                console.log("Data can't be retrieved!");
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prevPosts) => {
          return {...prevPosts,
              [name]: value,
        }});
    };

    const getToken = () => {
        const token = sessionStorage.getItem("token");
        return token;
    };

    const submit = (event) => {
        event.preventDefault();

        const input = {
            title: post.title,
            content: post.content,
        };

        const token = getToken();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        api.post("/api/save", input, config)
            .then(() => {
                console.log("Data has been sent to the server.");
                resetUserInput();
                fetchHome(token);
                navigate('/');
            })
            .catch(() => {
                console.log("Internal server error");
            });
    };

    const resetUserInput = () => {
        setPost({
            title: "",
            content: "",
        });
    };

    const handleToken = (token) => {
        sessionStorage.setItem("token", token);
    };

    const handlePosts = () => {
        setPosts([]);
    }

    const fetchHome = (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        api.get("/home", config)
            .then((res) => {
                const data = res.data;
                console.log("data: ", data);
                setUser(data.user.username);
                fetchBlogPost(token);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="app">
            <Header token={getToken()} handlePosts={handlePosts}/>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home posts={posts} user={user} token={getToken()}/>
                    }
                />
                <Route
                    path="/compose"
                    element={
                        <Compose
                            submit={submit}
                            title={post.title}
                            content={post.content}
                            handleChange={handleChange}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Login
                            handleToken={handleToken}
                            fetchHome={fetchHome}
                        />
                    }
                />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
