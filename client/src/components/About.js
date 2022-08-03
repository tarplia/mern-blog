import React from 'react';

function About(props) {
    return (
        <div className={props.activeTab === 'about' ? 'about appear' : 'about hidden'}>
            <div className="container">
                <h2>Welcome to My MERN App</h2>
                <p>This website let you write and view your blog posts. Use the "Compose" tab to write your post. Once published, you'll be directed to the "Home" page to view your posts. It is created using MERN stack (MongoDB, Express, React and Node). Here are some of the highlights:</p>
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