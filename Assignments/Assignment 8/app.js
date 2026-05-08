// app.js
const express = require("express");
const app = express();

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Kunalktg1311",
  database: "PracticeDB",
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  if (rows.length > 0) {
    res.locals.users = rows[0].username;
  } else {
    res.locals.users = "No users yet...";
  }
  res.render("index");
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await pool.query("INSERT INTO users (username, password) VALUES($1, $2)", [
    username,
    password,
  ]);
  console.log(req.body);
  res.redirect("/");
});

app.listen(3000, () => console.log("App Running on Port 3000"));
