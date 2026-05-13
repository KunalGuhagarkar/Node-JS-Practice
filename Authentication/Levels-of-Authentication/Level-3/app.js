// Level-3 Salting Passwords for Improved Encryption

/*
  Salting
    What a salt is: a salt is a random string added to a password before hashing. It’s different for each user.

    Why we add it: if two users have the same password, adding a different salt makes their stored hashes different, so attackers can’t tell they share a password.

    Flow:
      password + 28891(random set of characters) --Hash-Function--> Hash

    Typical process when a user signs up:

      - Generate a cryptographically-strong random salt (e.g., 16–32 bytes).
      - Combine salt + password (or apply a standard algorithm that accepts a salt).
      - Hash the combination with a secure hashing function (bcrypt, Argon2, PBKDF2, or scrypt).
      - Store the salt and the hash (not the plain password).

    Short analogy: 
      salting is like adding a unique secret spice to each person’s jam before putting it in jars; even if two jars use the same fruit (password), the taste (hash) is different because of the spice (salt), so a thief can’t identify matching jars easily.
*/

/*
  bcrypt:
    bcrypt is a widely used password-hashing algorithm that securely converts plain passwords into one-way hashes by adding a unique salt and applying a deliberately slow, configurable work factor; this makes stored passwords resistant to rainbow-table and brute-force attacks because identical passwords produce different hashes and cracking attempts are computationally expensive, so applications should store only bcrypt hashes (not plaintext) and verify logins by comparing the bcrypt hash of the submitted password to the stored hash.
*/

/*
  Salting Rounds:
    Salt rounds (a.k.a. the cost factor) are the parameter you give bcrypt that controls how slow and therefore hard to brute‑force the hashing is. Each increment increases the work exponentially: bcrypt performs 2^cost internal iterations, so a cost of 10 does 2^10 work, cost 12 does 2^12, etc.

    Why it Matters ?
      - Higher rounds → slower hashing → much harder for attackers to try millions of guesses, but also more CPU for your server when users sign up or log in.

      - Choose a rounds value that makes hashing take a small, acceptable delay on your server (e.g., ~100–500 ms) and increase it over time as hardware gets faster.
*/

/*
  bcrypt package

    Command:
      npm i bcrypt
*/

const express = require("express");
const app = express();

// import the bcrypt module
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const path = require("node:path");
const { Pool } = require("pg");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

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

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const { rows } = await connection.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    if (rows.length <= 0) {
      res.send("User not found.");
    }

    bcrypt.compare(password, rows[0].password, (err, login) => {
      if (err) {
        console.error("Error");
      } else {
        if (login) {
          res.render("secret");
        } else {
          res.send("Wrong Password");
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
});

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

app.listen(3000, () => console.log("App Running on Port 3000"));
