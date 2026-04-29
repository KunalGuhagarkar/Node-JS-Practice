const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const userController = require("../controller/userController");

router.get("/", userController.getUser)

router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 Characters"),
  ],
  userController.postUser,
);

module.exports = router;