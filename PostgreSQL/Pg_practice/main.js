// Practice of PostgreSql
const express = require("express");
const app = express();

const path = require("node:path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const { Client } = require("pg");

const connection = new Client({
  host: "localhost",
  user: "#",
  password: "#",
  database: "PracticeDB",
});

connection.connect().then(() => console.log("Connection Successfull."));

async function getUsers() {
  const users = await connection.query("SELECT name FROM users;");
  const showUsers = users.rows.map((user) => user.name);
  return showUsers.toString();
}

async function addUser(req, res) {
  const { id, name, email } = req.body;
  const newUser = await connection.query(
    "INSERT INTO users (id, name, email) VALUES ($1, $2, $3)",
    [id, name, email],
  );
  console.log("Added new User successfully.");
}

app.get("/", async (req, res) => {
  const showUsers = await getUsers();
  console.log(showUsers);
  res.send("Users: " + showUsers);
});

app.get("/new", (req, res) => {
  res.render("index");
});

app.post("/new", async (req, res) => {
  await addUser(req, res);
  res.redirect("/");
});

app.listen(3000, () => console.log("Server Running Successfully..."));
