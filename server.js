const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const authentication = require('./confg/authentication');
const jwt = require('jsonwebtoken');
const key = require('./confg/keys').secretOrKey;

const app = express();
// const PORT = process.env.PORT || 8080;
const PORT = 8080;

const routes = require("./routes/api");

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mern-practice", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

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
app.use("/api", routes);

app.post("/login", (req, res) => {
    const token = authentication({username: req.body.username});
    res.json(token);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, key, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

app.get("/home", authenticateToken, (req, res) => {
    res.json({
        user: req.user
    });
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Server
app.listen(PORT, console.log(`Server is starting at ${PORT}`));

