// Session and Cookies

/*
  Cookies:
    Cookies are small pieces of data (tiny text files) that a website asks your browser to store and send back with future requests.

  Session:
    A session is a way for a web server to remember who a user is and what they did during a short period of interaction. In plain terms, a session groups a user’s requests together so the server can keep state (like “logged in”, shopping-cart contents, or form progress) even though each HTTP request is independent.
*/

/*
  Passport:
    Passport.js is a popular, modular authentication middleware for Node.js that’s commonly used with Express apps to add login and identity functionality.
*/

const express = require("express");
const app = express();

// import the bcrypt module
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const path = require("node:path");
const { Pool } = require("pg");

// import session
const session = require("express-session");
// import passport
const passport = require("passport");
const { Strategy } = require("passport-local");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
// Add session
app.use(
  session({
    secret: "Topsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // Setting Duration to One Day
    }
  }),
);

// This should go after the session middleware
app.use(passport.initialize());
app.use(passport.session());

const connection = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Kunalktg1311",
  database: "PracticeDB",
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("secret");
  } else {
    res.redirect("/login");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  }),
);

app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Password Hashing
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error Hashing Password: " + err);
      }
      const insert = await connection.query(
        "INSERT INTO users (username, password) VALUES($1, $2)",
        [username, hash],
      );
      res.redirect("/");
    });
  } catch (error) {
    console.error(error);
  }
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const { rows } = await connection.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      if (rows.length <= 0) {
        return cb(null, false, { message: "Username not found" });
      }

      bcrypt.compare(password, rows[0].password, (err, login) => {
        if (err) {
          return cb(err);
        } else {
          if (login) {
            return cb(null, user);
          } else {
            return cb(null, false, { message: "Incorrect Password" });
          }
        }
      });
    } catch (error) {
      return cb(error);
    }
  }),
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(3000, () => console.log("App Running on Port 3000"));
