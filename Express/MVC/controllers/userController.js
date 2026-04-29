// Logic goes here
const user = require("../models/User");

exports.getUser = (req, res) => {
  res.render("index", {
    user: `This is user: ${user.greet("Kunal")} and User Details: ${user.userDetails("Kunal", 22)}`,
  });
};
