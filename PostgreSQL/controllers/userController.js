const db = require('../db/queries');

async function getUsernames(req, res) {
  const usernames = await db.getAllUsername();
  console.log("Usernames: ", usernames);
  res.send("Usernames: " + usernames.map(user => user.username).join(', '));
}

async function createUsernameGet(req, res) {
  // render the form
  res.render('index');
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost
}