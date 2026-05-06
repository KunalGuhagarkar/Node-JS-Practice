const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsername();
  console.log("Usernames: ", usernames);
  res.send("Usernames: " + usernames.map((user) => user.username).join(", "));
}

async function createUsernameGet(req, res) {
  // render the form
  res.render("index");
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function searchUsernameGet(req, res) {
  const search = req.query.search;
  const searchResults = await db.searchUsername(search);
  res.send(
    "Search Results: " +
      searchResults.map((result) => result.username).join(", "),
  );
}

async function deleteAllUsers(req, res) {
  await db.deleteAllUsers();
  res.redirect("/");
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  searchUsernameGet,
  deleteAllUsers,
};
