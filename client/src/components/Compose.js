import React from "react";

function Compose(props) {
    return (
        <div className="compose-form">
            <div className="container">
                <h2>Compose</h2>
                <form onSubmit={props.submit}>
                    <div className="input-form form-group">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={props.title}
                            onChange={props.handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="input-form">
                        <textarea
                            name="content"
                            placeholder="Content"
                            cols="30"
                            rows="10"
                            value={props.content}
                            onChange={props.handleChange}
                            className="form-control"
                        />
                    </div>
                    <button>Publish</button>
                </form>
            </div>
        </div>
    );
}

export default Compose;
