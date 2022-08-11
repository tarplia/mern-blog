import React, { useState } from "react";

function Home(props) {
    const [hack, setHack] = useState(0);

    function handleClick(event, post) {
        post.isExpanded = true;

        setHack(hack + 1);
        event.preventDefault();
    }

    return (
        <div
            className={
                props.activeTab === "home" ? "home appear" : "home hidden"
            }
        >
            <div className="container">
                <h2>Hello, {props.user}</h2>
                <p>
                    Lacus vel facilisis volutpat est velit egestas dui id
                    ornare. Semper auctor neque vitae tempus quam. Sit amet
                    cursus sit amet dictum sit amet justo. Viverra tellus in hac
                    habitasse. Imperdiet proin fermentum leo vel orci porta.
                    Donec ultrices tincidunt arcu non sodales neque sodales ut.
                    Mattis molestie a iaculis at erat pellentesque adipiscing.
                    Magnis dis parturient montes nascetur ridiculus mus mauris
                    vitae ultricies. Adipiscing elit ut aliquam purus sit amet
                    luctus venenatis lectus. Ultrices vitae auctor eu augue ut
                    lectus arcu bibendum at. Odio euismod lacinia at quis risus
                    sed vulputate odio ut. Cursus mattis molestie a iaculis at
                    erat pellentesque adipiscing.
                </p>
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
                                        {post.content.substring(0, 100) +
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
