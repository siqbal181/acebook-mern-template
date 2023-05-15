const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:email", UsersController.GetUsername);
router.get("/:id", UsersController.GetUserById);

module.exports = router;
