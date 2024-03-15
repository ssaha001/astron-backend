const express = require("express");
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const { strategy } = require("./auth");

const HTTP_PORT = process.env.PORT || 8080;
const API_EXTENSION = process.env.API_EXTENSION;

const app = express();

// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());

app.use(cors());

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(API_EXTENSION + "/users", userRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}${API_EXTENSION}`);
});
