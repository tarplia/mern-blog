const mongoose = require("mongoose");

// Schema
const BlogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: {
        type: String,
        default: Date.now(),
    },
});

// Model
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
