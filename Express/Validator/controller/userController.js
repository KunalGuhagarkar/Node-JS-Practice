const { validationResult } = require("express-validator");
const userModal = require("../Models/User");

exports.getUser = (req, res) => {
  res.render("index", {name: null, errors: []});
}

exports.postUser = (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("index", {errors: errors.array(), name: req.body.name});
  }

  const { name } = req.body;

  userModal.addUser(name);
  
  res.render("index", {name, errors: []});
}