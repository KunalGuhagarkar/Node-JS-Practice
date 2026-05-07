// Authentication Basics
// Using passport.js, an excellent middleware to handle our authentication and sessions for us.
// Link -> https://www.passportjs.org/

/* 
  Set up:
    CREATE TABLE users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR(255),
      password VARCHAR(255)
    );

  install all the dependencies we need:
    npm install express express-session pg passport passport-local ejs

*/

/*
  Securing passwords
  
  For the moment we are saving our users with just a plain text password. This is a really bad idea for any real-world project.
*/

const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Kunalktg1311",
  database: "PracticeDB",
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));


app.get("/sign-up", (req, res) => res.render("sign-up-form"));


app.post("/sign-up", async (req, res, next) => {
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      req.body.password,
    ]);
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
});


app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("App listening on Port 3000.");
});
