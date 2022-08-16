const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const authentication = require("./confg/authentication");
const jwt = require("jsonwebtoken");
const BlogPost = require("./models/blogPost");

const app = express();
const PORT = process.env.PORT || 8080;
// const PORT = 8080;

// Connecting to MongoDB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/mern-practice",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
);

// Data Parsing
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Allowing access to another domain (eg. fetching data from a different port no than server's port)
app.use(cors());

// HTTP request logger
app.use(morgan("tiny"));

// Routes

app.post("/login", (req, res) => {
    const token = authentication({ username: req.body.username });
    res.json(token);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.KEY, (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    });
}

app.get("/api", authenticateToken, (req, res) => {
    BlogPost.find({ author: req.user.username }, (err, foundItems) => {
        res.send(foundItems);
    });
});

app.post("/api/save", authenticateToken, (req, res) => {
    const data = req.body;
    data.author = req.user.username;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((err) => {
        if (err) {
            res.status(500).json({ msg: "Sorry, internal server errors" });
            return;
        }

        return res.json({ msg: "Data has been saved." });
    });
});

app.get("/home", authenticateToken, (req, res) => {
    res.json({
        user: req.user,
    });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Server
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
