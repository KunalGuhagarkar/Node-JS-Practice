// Form and Data Handling

/*
Install express-validator:
npm i express-validator
*/

// To use express-validator
const { body, validationResult } = require("express-validator");

/*
Understanding body() function

The body() function allows you to specify which fields in the request body should be validated and sanitized, as well as how to handle it.
*/

[
  body("birthdate", "Must be a valid date.")
    .optional({ values: "falsy" })
    .isISO8601(), // Enforce a YYYY-MM-DD format.
];

/*
This example marks birthdate field as optional, but still enforces the ISO8601 date format on inputs. This is because { values: "falsy" } means values that aren’t undefined, null, false, 0 or empty strings "" will still be validated.
*/

/*
Chaining Validations

You can also chain multiple validation methods, with unique error messages if the checks fail.
*/

[
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be Empty.")
    .isAlpha()
    .withMessage("Name must only contain alphabet letters"),
];

// This ensures that name is not only present and trimmed, but also only contains alphabet letters.

/*
Escaping user input

While this might work for outputs we know won’t have special characters, like names or ages, we also have to consider situations that do allow those characters. For example, when writing their “About Me” description, what would happen if the client decides to inject JavaScript code instead?

GOTO: views/about.ejs
*/

/*
Validation results

Once the validation rules are applied, you can use validationResult to handle any validation errors
*/
const controller = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("index", {
      errors: errors.array(),
    });
  }

  // do stuff if successfull
  res.redirect("/success");
};

/*
Forms and Express routes

One final thing to cover is how to handle routes in Express. After all, our form needs somewhere to send the data to.
*/

exports.userUpdateGet = (req, res, next) => {};
exports.userUpdatePost = (req, res, next) => {};

const express = require("express");
const app = express();

// Inside our router, we can then assign routes which correspond to the controller’s functions:
const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

// User update routes
usersRouter.get("/:id/update", usersController.userUpdateGet);
usersRouter.post("/:id/update", usersController.userUpdatePost);

module.exports = usersRouter;

// In our form, the action would look something like this:

// <!-- Example using EJS with POST to submit an update to our Express server. -->
<form action="/users/<%= user.userId %>/update" method="POST"></form>;

// /users/:id/update is an endpoint we’ve created on our Express server.

app.listen(3000, () => {
  console.log("App running on Port 3000");
});
