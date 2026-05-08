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

/*
  Securing Passwords with bcrypt

  npm install bcryptjs
*/

const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

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

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // We need to replace this with bcrypt.compare()
      // if (user.password !== password) {
      //   return done(null, false, { message: "Incorrect password" });
      // }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }

      // The before hashing user will not be able to log in

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/", (req, res) => res.render("index", { user: req.user }));

app.get("/sign-up", (req, res) => res.render("sign-up-form"));

app.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    /*
      The second argument is the length of the “salt” to use in the hashing function; salting a password means adding extra random characters to it, the password plus the extra random characters are then fed into the hashing function. Salting is used to make a password hash output unique, even for users who use the same password, and to protect against rainbow tables and dictionary attacks.
    */
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

/*
  In the Table (before and after hashing)
   id |  username  |                           password
  ----+------------+--------------------------------------------------------------
    1 | kunaladzzz | 1234
    2 | ram        | $2b$10$oy2A7JvgAb36c454hAzLleaD0JRCNgxD.hjDrurbdFlq5sbfjnJ22
*/

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("App listening on Port 3000.");
});
