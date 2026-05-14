// OAuth: Signin with Google

// ==========================================
// OAUTH (OPEN AUTHORIZATION)
// ==========================================

/*
|--------------------------------------------------------------------------
| WHAT IS OAUTH?
|--------------------------------------------------------------------------
|
| OAuth is an authentication system that allows users
| to log into an application using another company's account.
|
| Examples:
|
|   - Login with Google
|   - Login with GitHub
|   - Continue with Facebook
|
| Instead of creating a new username and password,
| users can use an existing trusted account.
|
*/

// ==========================================

/*
|--------------------------------------------------------------------------
| HOW OAUTH WORKS
|--------------------------------------------------------------------------
|
| Step 1:
| User clicks:
|
|   "Login with Google"
|
| Step 2:
| User is redirected to Google's login page.
|
| Step 3:
| Google verifies the user's identity.
|
| Step 4:
| Google sends authentication data/token
| back to the application.
|
| Step 5:
| Application logs the user in.
|
*/

// ==========================================

/*
|--------------------------------------------------------------------------
| IMPORTANT CONCEPT
|--------------------------------------------------------------------------
|
| Your application NEVER sees or stores
| the user's Google password.
|
| Google handles authentication securely.
|
*/

// ==========================================

/*
|--------------------------------------------------------------------------
| OAUTH FLOW
|--------------------------------------------------------------------------
|
| User
|   ↓
| Clicks "Login with Google"
|   ↓
| Google Authentication Page
|   ↓
| Google verifies user
|   ↓
| Google sends token to your app
|   ↓
| User logged into your app
|
*/

// ==========================================

/*
|--------------------------------------------------------------------------
| WHY OAUTH IS POPULAR
|--------------------------------------------------------------------------
|
| Benefits:
|
|   - More secure
|   - No password storage
|   - Faster login/signup
|   - Trusted authentication providers
|   - Better user experience
|
*/

// ==========================================

/*
|--------------------------------------------------------------------------
| COMMON OAUTH PROVIDERS
|--------------------------------------------------------------------------
|
|   - Google
|   - GitHub
|   - Facebook
|   - Discord
|   - Apple
|
*/

// ==========================================

/*
|--------------------------------------------------------------------------
| OAUTH vs NORMAL AUTHENTICATION
|--------------------------------------------------------------------------
|
| NORMAL AUTH:
|   - App stores passwords
|   - App handles login security
|
| OAUTH:
|   - Provider handles authentication
|   - App receives authentication token
|
*/

// ==========================================

/*
|--------------------------------------------------------------------------
| NODE.JS IMPLEMENTATION
|--------------------------------------------------------------------------
|
| OAuth is commonly implemented using:
|
|   - Passport.js
|
| Example:
|
|   passport.use(new GoogleStrategy(...))
|
*/

// ==========================================
// SIMPLE ANALOGY
// ==========================================

/*
|--------------------------------------------------------------------------
| ANALOGY
|--------------------------------------------------------------------------
|
| OAuth is like asking Google:
|
|   "Can you confirm this person is real?"
|
| Google replies:
|
|   "Yes, I already verified them."
|
| Then your app trusts Google
| and allows the user to log in.
|
*/

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

const dotenv = require('dotenv').config();

// import session
const session = require("express-session");
// import passport
const passport = require("passport");
const { Strategy } = require("passport-local");

/* 
  Google OAuth package
    Command:
      npm i passport-google-oauth2
*/
const GoogleStrategy = require("passport-google-oauth2").Strategy;

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
      maxAge: 1000 * 60 * 60 * 24, // Setting Duration to One Day
    },
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

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  }),
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect("/");
  });
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
  "local",
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

// Google OAuth Implementation
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const result = await connection.query(
          "SELECT * FROM users WHERE username = $1",
          [profile.email],
        );
        if (result.rows.length === 0) {
          const newUser = await connection.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [profile.email, "google"],
          );
          cb(null, newUser.rows[0]);
        } else {
          cb(null, result.rows[0]);
        }
      } catch (error) {
        cb(error);
      }
    },
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(3000, () => console.log("App Running on Port 3000"));
