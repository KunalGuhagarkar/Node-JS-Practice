const { Client } = require("pg");

const SQL = `

  CREATE TABLE IF NOT EXISTS usernames (
    id INTEGER PRIMARY KEY GENERATED AS IDENTITY,
    username VARCHAR(255)
  );

  INSERT INTO usernames (username) 
  VALUES ('Kunal'), ('Sid'), ('Kanak');

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://postgres:Kunalktg1311@localhost:5432/top_users",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done.");
}

main();