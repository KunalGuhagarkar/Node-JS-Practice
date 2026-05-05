const express = require("express");
const app = express();
const path = require("node:path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  console.log("User names will be logged here - wip");
});

app.get("/new", (req, res) => {
  res.render("index.ejs");
});

app.post("/new", (req, res) => {
  console.log("Username to be saved: ", req.body.username);
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
