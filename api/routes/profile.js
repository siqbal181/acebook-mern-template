const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/:id", ProfileController.GetUserById);

module.exports = router;