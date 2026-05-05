const pool = require('./pool');

async function getAllUsername() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES($1)", [username]);
}

/*
  Parameterization
  What’s with the $1 in the insert query?

  Alternatively, the query could look like:
  await pool.query("INSERT INTO usernames (username) VALUES ('" + username + "')");

  We’re passing user entered value i.e. username directly into our query. A nefarious user could enter something like sike'); DROP TABLE usernames; -- and wreak havoc. Scary stuff. This is called SQL injection.

  pg provides query parameterization to prevent this. Instead of passing user input directly, we pass it in an array as the second argument. pg handles the rest.
*/

module.exports = {
  getAllUsername,
  insertUsername
};