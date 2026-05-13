// Error Handling

const express = require("express");
const app = express();

// Using try/catch
app.get("/trycatch", (req, res, next) => {
  try {
    JSON.parse("invalid json"); // this will throw error
    res.send("Success");
  } catch (error) {
    next(error);
  }
});

// Using try/catch with async
// app.get('/async', async (req, res, next) => {
//   try {
//     // simulate async error
//     throw new Error("Async error happened");
//     res.send("Success");
//   } catch (err) {
//     next(err);
//   }
// });

// Error Handler Middleware
/*
An error handler middleware function handles all errors in our application that come down from other middleware functions. We want to place this error middleware function at the very end of the application code to ensure it’s the last middleware function executed and only handles errors bubbling down from preceding middleware functions.
*/

// app.use((req, res, next) => {
//   throw new Error("OH NO!");
//   // or next(new Error("OH NO!"));
// });

// app.use((err, req, res, next) => {
//     console.error(500 ,err);
//     res.status(500).send(err.message);
// });

// Creating custom errors
const CustomNotFoundError = require("./errors/CustomNotFoundError.js");

app.get("/user/:id", (req, res, next) => {
  const user = null; // pretend DB

  if (!user) {
    return next(new CustomNotFoundError("User not found"));
  }

  res.send(user);
});

// next function

function middleware1(req, res, next) {
  console.log("Middleware 1 Called");
  next();
}

function middleware2(req, res, next) {
  console.log("Middleware 2 Called");
  res.send("Response from Middleware 2.");
}

function middleware3(req, res, next) {
  console.log("Middleware 3 Called");
  res.send("Response from Middleware 2.");
}

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);
// will log `Middleware 1` -> `Middleware 2` and send a response with the text "Response from Middleware 2"

/*
 - No argument next() - Will pass control to the next middleware function. Very simple and straightforward.
 
 - With an error argument next(new Error(...)) - Will pass control directly to the error middleware function.
 
 - With the string next('route') - Will pass control to the next route handler with the same matching path (if there is one). This only works for app.METHOD or router.METHOD. Potentially, it can also be the same as just calling next with no argument.
 
 - With the string next('router') - Will skip all middleware functions attached to the specific router instance and pass control back out of the router instance. Basically, we exit the router and go back to the parent router, e.g. app (yes, the Express app is also just a router under the hood).
*/

app.listen(3000);