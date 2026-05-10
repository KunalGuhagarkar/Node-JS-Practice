// Authentication Practice

const express = require("express");
const app = express();

const path = require("node:path");

// Session Management
const session = require("express-session");

// Authentication using Passport
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const { Pool } = require("pg");

// Establish Postgre Connection
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Kunalktg1311",
  database: "PracticeDB",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      if (user.password !== password) {
        return done(null, false, { message: "Incorrect Username" });
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = rows[0];
  done(null, user);
});

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

app.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("App Running on Server 3000"));
