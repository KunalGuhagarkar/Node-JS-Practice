const db = require("../db/queries");

async function getUsersGet(req, res) {
  const usernames = await db.getUsers();
  console.log(usernames);
  res.send("Usernames: " + usernames.map((user) => user.username).join(", "));
}

module.exports = {
  getUsersGet,
}