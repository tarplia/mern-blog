const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const key = require('../confg/keys').secretOrKey;

const { json } = require("body-parser");

const BlogPost = require("../models/blogPost");
const { rawListeners } = require("../models/blogPost");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, key, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
    
      req.user = user
      console.log(req.user);
  
      next()
    })
  }
// Get
router.get("/", authenticateToken, (req, res) => {
    BlogPost.find({author: req.user.username}, (err, foundItems) => {
        res.send(foundItems);
    });
});

// Post route to save data to DB
router.post("/save", authenticateToken, (req, res) => {
    const data = req.body;
    data.author = req.user.username;
    console.log(data);

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((err) => {
        if (err) {
            res.status(500).json({msg: 'Sorry, internal server errors'});
            return;
        }

        return res.json({msg: 'Data has been saved.'})
    });
});

module.exports = router;
