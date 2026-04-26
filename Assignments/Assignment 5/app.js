const express = require("express");
const app = express();

const path = require("node:path");

// Adding EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Adding Static Assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// navbar links
const links = [
  { link: "/", text: "Home" },
  { link: "/about", text: "About" },
];

// Home
app.get("/", (req, res) => {
  res.render("index", { links: links });
});

// About
app.get("/about", (req, res) => {
  res.render("about", { links: links });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
