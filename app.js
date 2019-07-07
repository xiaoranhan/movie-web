const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

// DB config
const db = require("./config/keys").MongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Passport
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server started"));
