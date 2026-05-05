/*
  Enter the PostgreSQL shell by running psql in your terminal. 
  You can view the current dbs using the \l command.
*/

-- Query:
CREATE DATABASE top_users;

-- Command:
\l
-- Output
/*
    Name     |  Owner   | Encoding | Locale Provider |      Collate       |       Ctype        | Locale | ICU Rules |   Access privileges
    -------------+----------+----------+-----------------+--------------------+--------------------+--------+-----------+-----------------------
    Practice DB | postgres | UTF8     | libc            | English_India.1252 | English_India.1252 |        |           |
    postgres    | postgres | UTF8     | libc            | English_India.1252 | English_India.1252 |        |           |
    template0   | postgres | UTF8     | libc            | English_India.1252 | English_India.1252 |        |           | =c/postgres          +
                |          |          |                 |                    |                    |        |           | postgres=CTc/postgres
    template1   | postgres | UTF8     | libc            | English_India.1252 | English_India.1252 |        |           | =c/postgres          +
                |          |          |                 |                    |                    |        |           | postgres=CTc/postgres
    top_users   | postgres | UTF8     | libc            | English_India.1252 | English_India.1252 |        |           |
    (5 rows)

*/

-- Now let’s connect to the db:
\c top_users
-- Output: You are now connected to database "top_users" as user "postgres".

-- Verify that the psql prompt should be:
top_users=#

/*
  Breakdown of top_users=#
  top_users → the name of the database you’re currently connected to
  # → indicates your permission level (superuser/admin)

  So:

  top_users=# means:
  You are connected to a database named top_users as a superuser

  What if you see $ instead?
  - top_users=# → superuser (admin privileges)
  - top_users=> → normal user (limited privileges)
*/

-- Now create a table and its columns to store username data:
CREATE TABLE usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255)
);

/*
  What GENERATED ALWAYS AS IDENTITY means?
    It tells PostgreSQL:
      “Automatically generate a unique number for this column every time a new row is inserted.”
*/

/*
  Verify that the table has been created by running \d. You should see the following two tables in the output (we’ve skipped some output details for brevity):
*/

-- Command:
\d

/*
  Output:
                    List of relations
  Schema |       Name       |   Type   |  Owner
  --------+------------------+----------+----------
  public | usernames        | table    | postgres
  public | usernames_id_seq | sequence | postgres
  (2 rows)
*/

/*
  Identity column

  Wait a minute, what’s this usernames_id_seq thing?

  The GENERATED ALWAYS AS IDENTITY clause is the culprit. It defined the id column as an identity column. PostgreSQL now automatically generates a value for this column. By default it starts at 1 and increments by 1 for each new row. Additionally, PostgreSQL implicitly creates usernames_id_seq, which is a sequence object, that keeps track of the next value to be used.
*/

-- INSERT VALUES:
INSERT INTO usernames (username)
VALUES ('Mao'), ('nevz'), ('Lofty');

-- Display usernames:
SELECT * FROM usernames;

/*
  Output:
   id | username
  ----+----------
    1 | Mao
    2 | nevz
    3 | Lofty
  (3 rows)
*/