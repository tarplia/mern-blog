const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

const BlogPost = require("../models/blogPost");

// Get
router.get("/", (req, res) => {
    BlogPost.find({}, (err, foundItems) => {
        res.send(foundItems);
    });
});

// Post route to save data to DB
router.post("/save", (req, res) => {
    const data = req.body;

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
