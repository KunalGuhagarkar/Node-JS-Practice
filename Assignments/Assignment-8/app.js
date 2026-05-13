// app.js
const express = require("express");
const app = express();

// Session
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

// Password Hashing
const bcrypt = require("bcryptjs");

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Kunalktg1311",
  database: "PracticeDB",
});

app.set("view engine", "ejs");
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

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }

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
  } catch (error) {
    done(error);
  }
});

app.get("/", async (req, res) => {
  res.render("index", { user: req.user });
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up-form");
});

app.post("/sign-up", async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("App Running on Port 3000"));
