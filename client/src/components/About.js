import React from 'react';

function About(props) {
    return (
        <div className="about">
            <div className="container">
                <h2>Welcome to My Blog Web App</h2>
                <p>This app let you write and view your blog posts. First, sign-in into this app using the Login tab. Once logged in, use the "Compose" tab to write your post and see it published on the Home page. Only the first 100 characters are displayed, so click on the "Read More" button to view the full post. Thanks for visiting and Happy exploring!</p>
                <h3>Tech stack:</h3>
                <p>This app was created using MERN stack (MongoDB, Express, React and Node). Here are some of the highlights:</p>
                <ul>
                    <li>React for client-side rendering, including building single-page app, componentizing the app, handling events.</li>
                    <li>MongoDB CRUD operations hosted in MongoDB Atlas.</li>
                    <li>Mongoose library to connect from JavaScript to MongoDB.</li>
                    <li>Express JS for server-side framework, including managing server and routing.</li>
                    <li>Axios library to make request and handle the transformation of request and response data.</li>
                    <li>Deployment using Heroku.</li>
                </ul>
            </div>
        </div>
    );
}

export default About;