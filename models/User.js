const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
