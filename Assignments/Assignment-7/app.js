// Postgre Assignment
const express = require("express");
const app = express();

const path = require('node:path');

const userRoute = require('./routes/userRoutes');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.use("/", userRoute);

app.listen(3000, () => console.log("Server Running on Port 3000."));