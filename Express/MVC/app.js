// MVC
const express = require("express");
const app = express();

const path = require("node:path");

const userRouter = require("./routes/userRoute");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
