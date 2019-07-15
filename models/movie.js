const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  poster: String,
  year: String,
  rate: Number
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
