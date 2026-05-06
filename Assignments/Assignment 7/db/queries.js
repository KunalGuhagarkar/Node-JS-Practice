const pool = require("./pool");

async function getUsers() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

module.exports = {
  getUsers,
};
