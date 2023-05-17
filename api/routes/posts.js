const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
// router.patch("/:id", PostsController.UpdateLikeCount);
router.patch("/:id", PostsController.LikeByUser);
router.post("/", PostsController.Create);

module.exports = router;
