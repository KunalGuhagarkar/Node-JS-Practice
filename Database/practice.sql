-- Execute this in the Terminal
.mode csv
.import data.csv data
.quitsq

.schema -- Output: CREATE TABLE "data"("id" ANY, "language" ANY);

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

