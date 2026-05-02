-- Start SQLite
sqlite3.exe practice.db

-- Execute this in the Terminal
.mode csv
.import data.csv data
.quit

.schema -- Output: CREATE TABLE "data"("id" ANY, "language" ANY);

-- CRUD
-- C -> CREATE
-- R (READ) -> SELECT
-- U -> UPDATE
-- D -> DELETE/DROP

-- SELECT SYNTAX
SELECT columns FROM table;

--QUERY:
SELECT * FROM data;
-- Output:
-- ╭────┬──────────╮
-- │ id │ language │
-- ╞════╪══════════╡
-- │  1 │ Python   │
-- │  2 │ Python   │
-- │  3 │ Java     │
-- │  4 │ C        │
-- │  5 │ Java     │
-- │  6 │ C        │
-- │  7 │ Python   │
-- │  8 │ Java     │
-- │  9 │ Python   │
-- ╰────┴──────────╯

-- QUERY
SELECT language FROM data;
-- Output:
-- ╭──────────╮
-- │ language │
-- ╞══════════╡
-- │ Python   │
-- │ Python   │
-- │ Java     │
-- │ C        │
-- │ Java     │
-- │ C        │
-- │ Python   │
-- │ Java     │
-- │ Python   │
-- ╰──────────╯

-- QUERY
SELECT language, problem FROM favorites; 
-- Output
-- ╭──────────┬───────────────────────╮
-- │ language │        problem        │
-- ╞══════════╪═══════════════════════╡
-- │ Python   │ Readability           │
-- │ Python   │ Mario                 │
-- │ Python   │ Filter                │
-- │ Python   │ Starting from Scratch │
-- │ Scratch  │ Starting from Scratch │
-- │ Python   │ Credit                │
-- │ Python   │ Hello, World          │
-- │ C        │ Cash                  │
-- │ Python   │ Filter                │
-- │ Python   │ DNA                   │
-- │ C        │ Filter                │
-- ╰──────────┴───────────────────────╯

-- Built-In Functions
-- AVG
-- COUNT
-- DISTINCT
-- LOWER
-- MAX
-- MIN
-- UPPER
-- ...

-- QUERY
SELECT COUNT(*) FROM favorites;
-- Output:
-- ╭──────────╮
-- │ count(*) │
-- ╞══════════╡
-- │      272 │
-- ╰──────────╯

-- QUERY
SELECT DISTINCT language FROM favorites;
-- Output:
-- ╭──────────╮
-- │ language │
-- ╞══════════╡
-- │ Python   │
-- │ Scratch  │
-- │ C        │
-- ╰──────────╯

-- QUERY
SELECT COUNT(DISTINCT language) FROM favorites;
-- Output:
-- ╭──────────────────────╮
-- │ COUNT(DISTINCT la... │
-- ╞══════════════════════╡
-- │                    3 │
-- ╰──────────────────────╯

-- For More Control:
-- GROUP BY
-- LIKE
-- LIMIT
-- ORDER BY
-- WHERE
-- ...

-- QUERY
SELECT COUNT(*) FROM favorites WHERE language = 'C';
-- Output:
-- ╭──────────╮
-- │ COUNT(*) │
-- ╞══════════╡
-- │       58 │
-- ╰──────────╯

-- QUERY
SELECT COUNT(*) FROM favorites WHERE language = 'C' AND problem = 'Hello, World';
-- Output:
-- ╭──────────╮
-- │ COUNT(*) │
-- ╞══════════╡
-- │        5 │
-- ╰──────────╯

-- For escaping a single quote (')
-- QUERY
SELECT COUNT(*) FROM favorites WHERE language = 'C' AND problem = 'Hello, It''s Me';
-- Output:
-- ╭──────────╮
-- │ COUNT(*) │
-- ╞══════════╡
-- │        0 │
-- ╰──────────╯

-- QUERY
SELECT COUNT(*) FROM favorites WHERE language = 'C' AND (problem = 'Hello, It''s Me' OR problem = 'Hello, World');
-- Output:
-- ╭──────────╮
-- │ COUNT(*) │
-- ╞══════════╡
-- │        5 │
-- ╰──────────╯

-- QUERY
SELECT COUNT(*) FROM favorites WHERE language = 'C' AND problem LIKE 'Hello, %';
-- The LIKE operator combined with the % wildcard matches any text starting with "Hello, " (e.g., "Hello, World" or "Hello, It's Me").
-- Output:
-- ╭──────────╮
-- │ COUNT(*) │
-- ╞══════════╡
-- │        5 │
-- ╰──────────╯

-- QUERY
SELECT language, COUNT(*) FROM favorites GROUP BY language;
-- Output
-- ╭──────────┬──────────╮
-- │ language │ COUNT(*) │
-- ╞══════════╪══════════╡
-- │ C        │       58 │
-- │ Python   │      190 │
-- │ Scratch  │       24 │
-- ╰──────────┴──────────╯

-- QUERY
SELECT language, COUNT(*) FROM favorites GROUP BY language ORDER BY COUNT(*) DESC;
-- Output:
-- ╭──────────┬──────────╮
-- │ language │ COUNT(*) │
-- ╞══════════╪══════════╡
-- │ Python   │      190 │
-- │ C        │       58 │
-- │ Scratch  │       24 │
-- ╰──────────┴──────────╯

-- QUERY
SELECT language, COUNT(*) AS n FROM favorites GROUP BY language ORDER BY n DESC; 
--Output:
-- ╭──────────┬─────╮
-- │ language │  n  │
-- ╞══════════╪═════╡
-- │ Python   │ 190 │
-- │ C        │  58 │
-- │ Scratch  │  24 │
-- ╰──────────┴─────╯

-- QUERY
SELECT language, COUNT(*) AS n FROM favorites GROUP BY language ORDER BY n DESC LIMIT 1; 
--Output:
-- ╭──────────┬─────╮
-- │ language │  n  │
-- ╞══════════╪═════╡
-- │ Python   │ 190 │
-- ╰──────────┴─────╯


-- INSERT SYNTAX
INSERT INTO table (column, ...) VALUES(value, ...);

-- QUERY
INSERT INTO favorites (language, problem) VALUES('SQL', 'Fiftyville');
SELECT * FROM favorites;
-- Output:
-- │10/20/2025 13:38:57│C       │Filter               │
-- │NULL               │SQL     │Fiftyville           │
-- ╰───────────────────┴────────┴─────────────────────╯


-- DELETE SYNTAX
DELETE FROM table WHERE condition;

-- QUERY
DELETE FROM favorites WHERE Timestamp IS NULL;
-- Output:
-- │10/20/2025 13:38:54│Python  │DNA                  │
-- │10/20/2025 13:38:57│C       │Filter               │
-- ╰───────────────────┴────────┴─────────────────────╯


-- UPDATE SYNTAX
UPDATE table SET column = value WHERE condition;

-- QUERY
-- (What not to do!!!)
UPDATE favorites SET language = 'SQL', problem = 'Fiftyville';
SELECT * FROM favorites;
-- Output:
-- ╭─────────────────────┬──────────┬────────────╮
-- │      Timestamp      │ language │  problem   │
-- ╞═════════════════════╪══════════╪════════════╡
-- │ 10/20/2025 9:45:26  │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:37 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:38 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:38 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:39 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:42 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:44 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:46 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:49 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:50 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:52 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:54 │ SQL      │ Fiftyville │
-- │ 10/20/2025 13:38:57 │ SQL      │ Fiftyville │
-- ╰─────────────────────┴──────────┴────────────╯

-- QUERY
DELETE FROM favorites;
SELECT * FROM favorites;
-- Output:
-- (Nothing shows up)

-- You have to again import it from start.

-- DROP SYNTAX
DROP TABLE table;