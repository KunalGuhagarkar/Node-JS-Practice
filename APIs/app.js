const express = require("express");
const app = express();
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const json = `{"name":"Kunal","age":22,"city":"Mumbai","education":[{"degree":"MCA","university":"Vidyavihar University"},{"degree":"BSc IT","university":"Mumbai University"}]}`;

const obj = JSON.parse(json);

app.get("/", (req, res) => {
  res.render("index", { obj: null });
});

app.post("/info", (req, res) => {
  console.log(req.body);
  const choice = obj[req.body.choice];
  res.render("index", { obj: choice });
});

app.listen(3000, () => console.log("App Running on Port 3000"));
