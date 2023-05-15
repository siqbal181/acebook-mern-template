const User = require("../models/user");

const ProfileController = {
  GetUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ username: user.username, email: user.email, message: "Found user" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
    }
  }

  module.exports = ProfileController;