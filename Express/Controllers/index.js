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

/*
res.json()

This is a more explicit way to respond to a request with JSON. This always sets the Content-Type header to application/json and sends the data as JSON.
*/

// As object
app.get('/json', (req, res) => {
  res.json({message : 'Hello this is a message'});
});

// As Array
app.get('/jsonArray', (req, res) => {
  res.json([6,7,6,7]);
});

// As Nested Data
app.get('/jsonNested', (req, res) => {
  res.json({
    user : {
      name: 'Kunal',
      skills: ['Node', 'JS']
    }
  });
});

/*
res.redirect()

When we want to redirect the client to a different URL, this method allows for that capability.
*/

app.get('/redirect', (req, res) => {
  res.redirect('/');
});

/*
res.render()

res.render lets you render a view template and send the resulting HTML as the response. We’ll cover this in a later lesson.

commands:
npm install ejs
*/

app.set('view engine', 'ejs');

app.get('/ejs', (req, res) => {
  res.render('./index', {name: 'Kunal'});
});

/*
res.status()

This sets the response’s status code but does not end the request-response cycle by itself. We can chain other methods through this (e.g. res.status(404).send(...) but note that we can’t do res.send(...).status(404)). We can omit this if we wish to use the default status code of 200.
*/

app.get('/status', (req, res) => {
  res.status(200).send('Successfull with status 200');
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("Server Running on Localhost:3000");
});
