import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

function Home(props) {
    const [hack, setHack] = useState(0);

    function handleClick(event, post) {
        post.isExpanded = true;

        setHack(hack + 1);
        event.preventDefault();
    }

    const isLoggedIn = !!props.token;

    return (
        <div className="home">
            <div className="container">
                {isLoggedIn ? (
                    <div>
                        <h2 className="user-greeting">Hello {props.user}!</h2>
                        <p>
                            Lacus vel facilisis volutpat est velit egestas dui
                            id ornare. Semper auctor neque vitae tempus quam.
                            Sit amet cursus sit amet dictum sit amet justo.
                            Viverra tellus in hac habitasse. Imperdiet proin
                            fermentum leo vel orci porta. Donec ultrices
                            tincidunt arcu non sodales neque sodales ut. Mattis
                            molestie a iaculis at erat pellentesque adipiscing.
                            Magnis dis parturient montes nascetur ridiculus mus
                            mauris vitae ultricies. Adipiscing elit ut aliquam
                            purus sit amet luctus venenatis lectus. Ultrices
                            vitae auctor eu augue ut lectus arcu bibendum at.
                            Odio euismod lacinia at quis risus sed vulputate
                            odio ut. Cursus mattis molestie a iaculis at erat
                            pellentesque adipiscing.
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2>Welcome to My Blog Web App</h2>
                        <p>
                            This app let you write and view your blog posts.
                            Thanks for visiting and Happy exploring!
                        </p>
                        <h4>Get started:</h4>
                        <ul>
                            <li>
                                Sign-in using the Login tab with username and
                                password of your choice.
                            </li>
                            <li>
                                Once logged in, use the Compose tab to write
                                your post and see it published in the Home page.
                            </li>
                            <li>
                                Only the first 100 characters of each post are
                                displayed, so click on the "Read More" button to
                                view the full post.
                            </li>
                        </ul>
                        <h4>Tech stack:</h4>
                        <p>
                            This app was created using MERN stack (MongoDB,
                            Express, React and Node). Here are some of the
                            highlights:
                        </p>
                        <ul>
                            <li>
                                React for client-side rendering, including
                                building single-page app, componentizing the
                                app, handling events.
                            </li>
                            <li>
                                MongoDB CRUD operations hosted in MongoDB Atlas.
                            </li>
                            <li>
                                Mongoose library to connect from JavaScript to
                                MongoDB.
                            </li>
                            <li>
                                Express JS for server-side framework, including
                                managing server and routing.
                            </li>
                            <li>
                                Axios library to make request and handle the
                                transformation of request and response data.
                            </li>
                            <li>Deployment using Heroku.</li>
                        </ul>
                    </div>
                )}

                <div className="blog-post">
                    {props.posts.map((post, index) => (
                        <div key={index} className="blog-post__display">
                            <h3 className="title">{post.title}</h3>
                            <div>
                                <div
                                    className={
                                        post.isExpanded ? "hidden" : "appear"
                                    }
                                >
                                    <span>
                                        {post.content?.substring(0, 100) +
                                            " ..."}
                                    </span>
                                    <a
                                        href="/"
                                        value={index}
                                        onClick={(event) => {
                                            handleClick(event, post);
                                        }}
                                    >
                                        Read More
                                    </a>
                                </div>
                                <div
                                    className={
                                        post.isExpanded ? "appear" : "hidden"
                                    }
                                >
                                    {post.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
