const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String },
  dateCreated: { type: Date, default: Date.now },
  comments: [{ type: String }],
  likedBy: [{ type: String }],
  author: { type: String }

});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
