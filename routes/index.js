const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config/keys");

const APIKEY = config.APIKEY;

router.get("/", (req, res) => res.send("hello, world"));

// search movie
router.get("/search", function(req, res) {
  var query = req.query.search;
  var url = "https://www.omdbapi.com/?s=" + query + "&apikey=" + APIKEY;
  request(url, function(request, response) {
    if (response.statusCode == 200) {
      res.send(JSON.parse(response.body));
    }
  });
});

// search movie by title
router.get("/results", function(req, res) {
  var query = req.query.title;
  var url = "https://www.omdbapi.com/?t=" + query + "&apikey=" + APIKEY;
  request(url, function(request, response) {
    if (response.statusCode == 200) {
      res.send(JSON.parse(response.body));
    }
  });
});

module.exports = router;
