const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const mongoose = require("mongoose");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      posts.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
  LikeByUser: async (req, res) => {
    const { id } = req.params;
    const username = req.body.username;

    const findPost = await Post.findOne({_id: id})
  
    if (findPost.likedBy.includes(username)) {
      const post = await Post.findOneAndUpdate({_id: id},
        { $pull: { likedBy: username }},
        { new: true }).exec()
        res.status(201).json({ message: "OK", post: post})
    }
    else {
      const post = await Post.findOneAndUpdate({_id: id},
        { $push: { likedBy: username }},
        { new: true }).exec()
        res.status(201).json({ message: "OK", post: post})
    }
  }
}

module.exports = PostsController;
