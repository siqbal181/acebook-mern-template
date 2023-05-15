const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
  GetUsername: (req, res) => {
    const email = (req.params.email);
    User.findOne({email: email}, async (err, user) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ username: user.username, message: "Found user" });
    });
  },
  GetUserById: async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
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
  
module.exports = UsersController;
