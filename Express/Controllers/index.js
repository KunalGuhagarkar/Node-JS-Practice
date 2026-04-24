// Controllers
/*
 the controller is the brains of the operation ensuring that each component plays its part in delivering the final result and is really just a function with well-defined responsibilities as part of the MVC pattern.
*/

const express = require("express");
const app = express();

/*
Handling Responses

res.send()
 A general-purpose method for sending a response, it is flexible with what data we can send since it will automatically set the Content-Type header based on what data you pass it. For example, if we pass in an object, it will stringify it as JSON and set the Content-Type header to application/json.
*/

// As string
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// As HTML
app.get("/headingOne", (req, res) => {
  res.send("<h1>This is HTML Heading One.</h1>");
});

// As JSON(object)
app.get("/object", (req, res) => {
  res.send({ name: "Kunal", age: 22 });
});

// As Array
app.get("/array", (req, res) => {
  res.send([1, 2, 3, 4]);
});



app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("Server Running on Localhost:3000");
});
