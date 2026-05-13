// Authentication Level-1 (Username and Password)
const express = require("express");
const app = express();

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

    if (rows[0].username !== username || rows[0].password !== password) {
      res.redirect("/");
      throw new Error("Incorrect Username or Password");
    }
    res.render("secret");
  } catch (error) {
    console.error(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const insert = await connection.query(
      "INSERT INTO users (username, password) VALUES($1, $2)",
      [username, password],
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => console.log("App Running on Port 3000"));
