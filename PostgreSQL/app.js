// Using node-postgres in Express
/*
  Command:
  npm i/install pg

  We can then initialize it in our application with the necessary connection information. Create a db folder, and a new file db/pool.js.

  Go To db/pool.js
*/

// Querying with pg
/*
  With our initialized Pool, we can use the query method. Create a new db/queries.js file. Upon revising our project requirements, we understand we need two db interactions: getting all usernames and inserting a new username.

  Go To db/queries.js
*/

const express = require("express");
const app = express();

const path = require("node:path");

const userRoute = require('./routers/userRouter');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use("/", userRoute);

// app.get("/", (req, res) => {
//   console.log("User names will be logged here - wip");
// });

// app.get("/new", (req, res) => {
//   res.render("index.ejs");
// });

// app.post("/new", (req, res) => {
//   console.log("Username to be saved: ", req.body.username);
// });

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
