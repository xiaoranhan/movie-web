const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config/keys");
const Movie = require("../models/movie");
const User = require("../models/User");
const APIKEY = config.APIKEY;
const passport = require("passport");

router.get("/", (req, res) => res.send("hello, world"));

// search movie
router.get("/search", (req, res) => {
  var query = req.query.search;
  var url = "https://www.omdbapi.com/?s=" + query + "&apikey=" + APIKEY;
  request(url, (request, response) => {
    if (response.statusCode == 200) {
      res.send(JSON.parse(response.body));
    }
  });
});

// search movie by title
router.get("/results", (req, res) => {
  let query = req.query.title;
  let url = "https://www.omdbapi.com/?t=" + query + "&apikey=" + APIKEY;
  request(url, (request, response) => {
    if (response.statusCode == 200) {
      res.send(JSON.parse(response.body).Title);
    }
  });
});

// get user's movie list, and sort by rate descending order
router.get("/movies", (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .populate({ path: "movies", options: { sort: { rate: -1 } } })
    .exec((err, movies) => res.json(movies));
});

// add movie to user
router.post("/add", (req, res) => {
  const { title, year, poster, rate, userId } = req.body;
  const newMovie = new Movie({
    title,
    year,
    poster,
    rate,
    user: userId
  });
  User.findById(userId).exec((err, user) => {
    if (err) {
      return res.send(err);
    }
    newMovie
      .save()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    user.movies.push(newMovie);
    user
      .save()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  });
  res.sendStatus(200);
});

// delete movie from user
router.delete("/delete", (req, res) => {
  const { movieId, userId } = req.body;
  User.findById(userId).exec((err, user) => {
    if (err) {
      return res.send(err);
    }
    Movie.findByIdAndDelete(movieId);

    user.movies.pull(movieId);
    user
      .save()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  });
  res.sendStatus(200);
});

// edit movie's rating
router.put("/edit", (req, res) => {
  const { rate, movieId, userId } = req.body;
  User.findById(userId).exec((err, user) => {
    if (err) {
      return res.send(err);
    }
    Movie.findOneAndUpdate(movieId, { rate }, (err, movie) => {
      if (err) {
        return res.send(err);
      }
      console.log(movie);
    });
  });
  res.sendStatus(200);
});

module.exports = router;
