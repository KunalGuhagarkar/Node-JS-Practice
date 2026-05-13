const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: "postgresql://postgres:Kunalktg1311@localhost:5432/top_users"
});