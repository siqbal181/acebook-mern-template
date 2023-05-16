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
  UpdateLikeCount: async (req, res) => {
    const { id } = req.params
    // checking if the ID is a valid Mongoose type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: "not valid ID"})
    }

    const post = await Post.findOneAndUpdate({_id: id},
      { $inc: { likeCount: 1} },
      { new: true }).exec()
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    // 201 for sending data
    res.status(201).json({ message: "OK", post: post})
  },
  GetPostsByUser: async (req, res) => {
    try {
      const { username } = req.params;
      const posts = await Post.find({ author: username })
        .sort({ dateCreated: -1 })
        .exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = PostsController;
