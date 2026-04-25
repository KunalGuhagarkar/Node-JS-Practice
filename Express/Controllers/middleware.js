// Middleware
/*
Middleware functions are a core concept in Express and play a crucial role in handling requests and responses. They operate between the incoming request and the final intended route handler.


A middleware function typically takes three arguments (however, there is one that we will get into later that has four):

 - req - The request object, representing the incoming HTTP request.

 - res - The response object, representing the HTTP response that will be sent back to the client.

 - next - The function that passes control to the next middleware function in the chain (we’ll get to this later). This is optional.


A middleware function can perform various tasks, such as:

 - Modifying the request or response objects (some packages for example will do this, like adding a new property in the request object, or setting the res.locals that is used in templates rendered with res.render).

 - Executing additional code (validation middleware functions to validate the request before going to our main logic, authentication middleware functions, and so on).

 - Calling the next middleware function in the chain.

 - Ending the request-response cycle (meaning no further middleware functions are called, even if there are more in the chain).
*/

/*
Application-level Middleware

In Node.js, application middleware usually means Express middleware that runs for every request, or for a group of routes, before the final route handler. It sits in the request-response pipeline and can read or change req and res, end the request early, or pass control onward.
*/

const express = require("express");
const app = express();

// Using app.use()
app.use((req, res, next) => {
  console.log("Middleware Running...");
  next();
});

// Using Path bases Middleware
/*
This only runs for:
    /about
    /about/team
    /about/anything
*/
app.use("/about", (req, res, next) => {
  console.log("About Middleware...");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Index Page.");
});

// Router-level Middleware
/*
Router-level middleware is attached to a specific router with router.use() or router.METHOD(), so it only runs for routes inside that router.
*/

const router = express.Router();

function routerMiddleware(req, res, next) {
    console.log('Router Middleware Called.');
    req.customProperty = 'Kunal';
    next();
}

router.use(routerMiddleware);

router.get('/routerMiddleware', (req, res) => {
    res.send(req.customProperty);
});

app.use(router);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("App running on Port 3000.");
});
