const express = require("express");
const app = express();
const path = require("node:path");
const { query, validationResult, matchedData } = require("express-validator");
const userRouter = require("./routes/userRoute");

/*
This creates a Validation Chain that works like a three-step inspection:

 - query("person"): Find the data labeled "person" in the URL.

 - .notEmpty(): Make sure they actually typed something there.

 - .escape(): Clean it up so it's safe to print on the screen.
*/

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));

// app.use(express.json());
// app.get("/", query("person").notEmpty().escape(), (req, res) => {
//   const result = validationResult(req);
//   if (result.isEmpty()) {
//     const data = matchedData(req);
//     return res.send(`Hello, ${data.person}!`);
//   }
//   res.send({ errors: result.array() });
// });

app.use("/", userRouter);

app.listen(3000, () => console.log("Server Running Port 3000"));
