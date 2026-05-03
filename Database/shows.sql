-- imdb

-- Commands:
.schema shows
-- Output:
-- CREATE TABLE shows (
--     id INTEGER,
--     title TEXT NOT NULL,
--     year NUMERIC,
--     episodes INTEGER,
--     PRIMARY KEY(id)
-- );

.tables
-- Output:
-- genres  people  ratings  shows  stars  writers

.schema ratings
-- Output:
-- CREATE TABLE ratings (
--     show_id INTEGER NOT NULL UNIQUE,
--     rating REAL NOT NULL,
--     votes INTEGER NOT NULL,
--     FOREIGN KEY(show_id) REFERENCES shows(id)
-- );


-- Query:
SELECT * FROM shows LIMIT 10;
--Output:
-- ╭─────┬───────────────────────────┬────┬────────╮
-- │ id  │           title           │year│episodes│
-- ╞═════╪═══════════════════════════╪════╪════════╡
-- │62614│Zeg 'ns Aaa                │1981│     227│
-- │63881│Catweazle                  │1970│      26│
-- │63962│UFO                        │1970│      26│
-- │65269│Ace of Wands               │1970│      46│
-- │65270│The Adventures of Don Quick│1970│       6│
-- │65271│Albert and Victoria        │1970│      12│
-- │65272│All My Children            │1970│    9699│
-- │65273│Archie's Funhouse          │1970│      23│
-- │65274│Arnie                      │1970│      48│
-- │65276│Barefoot in the Park       │1970│      12│
-- ╰─────┴───────────────────────────┴────┴────────╯

-- Query:
SELECT COUNT(*) FROM shows;
--Output:
-- ╭──────────╮
-- │ COUNT(*) │
-- ╞══════════╡
-- │   250087 │
-- ╰──────────╯

-- Query:
SELECT COUNT(*) FROM people;
--Output:
-- ╭──────────╮
-- │ COUNT(*) │
-- ╞══════════╡
-- │   704315 │
-- ╰──────────╯

-- Query:
SELECT * FROM ratings LIMIT 10;
--Output:
-- ╭─────────┬────────┬───────╮
-- │ show_id │ rating │ votes │
-- ╞═════════╪════════╪═══════╡
-- │   62614 │    6.7 │   392 │
-- │   63881 │    7.9 │  1224 │
-- │   63962 │    7.9 │  4518 │
-- │   65269 │    7.5 │   141 │
-- │   65270 │    7.5 │    33 │
-- │   65271 │    5.4 │    11 │
-- │   65272 │    6.8 │  3548 │
-- │   65273 │    6.8 │   219 │
-- │   65274 │    7.0 │   149 │
-- │   65276 │    6.6 │    80 │
-- ╰─────────┴────────┴───────╯

-- Relationships:
/*
1. One-to-One:
Where row in one table can map to row in another table
*/

/*
  SQLite DATA TYPES:
  1. BLOB (stands for Binary Large Objects stores raw 0s and 1s used to store files as well as sometimes binary data)
  2. INTEGER
  3. NUMERIC (dates, time types of data)
  4. REAL (like floats)
  5. TEXT
*/

/*
  CONSTRAINTS:
  KEYWORDS WORTH NOTING IN SQL:
  1. NOT NULL
  2. UNIQUE
*/

/*
  PRIMARY KEYS AND FOREIGN KEYS:
  1. Primary Key (PK)
  The Primary Key is a unique ID for every row in a table. It ensures that no two records are exactly the same.

   - Unique: Like a Social Security Number or a Passport ID.

   - Mandatory: Every row must have one, and it cannot be empty (NULL).

   - One per table: A table can only have one primary key.

  2. Foreign Key (FK)
  A Foreign Key is a column that points to a Primary Key in another table. It’s how you link data together.

   - Relationship: It creates a connection (e.g., linking a "Book" to its "Author").

   - Consistency: It prevents "orphan" data; you can't have a book written by an author ID that doesn't exist in the Author table.

   - Multiple: A table can have many foreign keys.
*/

-- Query:
SELECT * FROM ratings WHERE rating >= 6.0 LIMIT 10;
--Output:
-- ╭─────────┬────────┬───────╮
-- │ show_id │ rating │ votes │
-- ╞═════════╪════════╪═══════╡
-- │   62614 │    6.7 │   392 │
-- │   63881 │    7.9 │  1224 │
-- │   63962 │    7.9 │  4518 │
-- │   65269 │    7.5 │   141 │
-- │   65270 │    7.5 │    33 │
-- │   65272 │    6.8 │  3548 │
-- │   65273 │    6.8 │   219 │
-- │   65274 │    7.0 │   149 │
-- │   65276 │    6.6 │    80 │
-- │   65277 │    8.0 │    35 │
-- ╰─────────┴────────┴───────╯

-- Query:
SELECT show_id FROM ratings WHERE rating >= 6.0 LIMIT 10;
--Output:
-- ╭─────────╮
-- │ show_id │
-- ╞═════════╡
-- │   62614 │
-- │   63881 │
-- │   63962 │
-- │   65269 │
-- │   65270 │
-- │   65272 │
-- │   65273 │
-- │   65274 │
-- │   65276 │
-- │   65277 │
-- ╰─────────╯

-- Query:
SELECT * FROM shows WHERE id IN (
  SELECT show_id FROM ratings WHERE rating >= 6.0
) LIMIT 10;
--Output:
-- ╭─────┬───────────────────────────┬────┬────────╮
-- │ id  │           title           │year│episodes│
-- ╞═════╪═══════════════════════════╪════╪════════╡
-- │62614│Zeg 'ns Aaa                │1981│     227│
-- │63881│Catweazle                  │1970│      26│
-- │63962│UFO                        │1970│      26│
-- │65269│Ace of Wands               │1970│      46│
-- │65270│The Adventures of Don Quick│1970│       6│
-- │65272│All My Children            │1970│    9699│
-- │65273│Archie's Funhouse          │1970│      23│
-- │65274│Arnie                      │1970│      48│
-- │65276│Barefoot in the Park       │1970│      12│
-- │65277│The Best of Everything     │1970│     115│
-- ╰─────┴───────────────────────────┴────┴────────╯

-- Query:
SELECT title FROM shows WHERE id IN (
  SELECT show_id FROM ratings WHERE rating >= 6.0
) LIMIT 10;
--Output:
-- ╭─────────────────────────────╮
-- │            title            │
-- ╞═════════════════════════════╡
-- │ Zeg 'ns Aaa                 │
-- │ Catweazle                   │
-- │ UFO                         │
-- │ Ace of Wands                │
-- │ The Adventures of Don Quick │
-- │ All My Children             │
-- │ Archie's Funhouse           │
-- │ Arnie                       │
-- │ Barefoot in the Park        │
-- │ The Best of Everything      │
-- ╰─────────────────────────────╯

-- JOIN
-- Query:
SELECT * FROM shows
JOIN ratings ON shows.id = ratings.show_id
WHERE rating >= 6.0 LIMIT 10;
--Output:
-- ╭─────┬────────┬────┬────────┬───────┬──────┬─────╮
-- │ id  │ title  │year│episodes│show_id│rating│votes│
-- ╞═════╪════════╪════╪════════╪═══════╪══════╪═════╡
-- │62614│Zeg 'ns │1981│     227│  62614│   6.7│  392│
-- │     │Aaa     │    │        │       │      │     │
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │63881│Catweazl│1970│      26│  63881│   7.9│ 1224│
-- │     │e       │    │        │       │      │     │
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │63962│UFO     │1970│      26│  63962│   7.9│ 4518│
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │65269│Ace of  │1970│      46│  65269│   7.5│  141│
-- │     │Wands   │    │        │       │      │     │
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │65270│The     │1970│       6│  65270│   7.5│   33│
-- │     │Adventur│    │        │       │      │     │
-- │     │es of   │    │        │       │      │     │
-- │     │Don     │    │        │       │      │     │
-- │     │Quick   │    │        │       │      │     │
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │65272│All My  │1970│    9699│  65272│   6.8│ 3548│
-- │     │Children│    │        │       │      │     │
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │65273│Archie's│1970│      23│  65273│   6.8│  219│
-- │     │Funhouse│    │        │       │      │     │
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │65274│Arnie   │1970│      48│  65274│   7.0│  149│
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │65276│Barefoot│1970│      12│  65276│   6.6│   80│
-- │     │in the  │    │        │       │      │     │
-- │     │Park    │    │        │       │      │     │
-- ├─────┼────────┼────┼────────┼───────┼──────┼─────┤
-- │65277│The Best│1970│     115│  65277│   8.0│   35│
-- │     │of Every│    │        │       │      │     │
-- │     │thing   │    │        │       │      │     │
-- ╰─────┴────────┴────┴────────┴───────┴──────┴─────╯

-- Query:
SELECT title, rating FROM shows
JOIN ratings ON ratings.show_id = shows.id
WHERE rating >= 6.0 LIMIT 10;
--Output:
-- ╭─────────────────────────────┬────────╮
-- │            title            │ rating │
-- ╞═════════════════════════════╪════════╡
-- │ Zeg 'ns Aaa                 │    6.7 │
-- │ Catweazle                   │    7.9 │
-- │ UFO                         │    7.9 │
-- │ Ace of Wands                │    7.5 │
-- │ The Adventures of Don Quick │    7.5 │
-- │ All My Children             │    6.8 │
-- │ Archie's Funhouse           │    6.8 │
-- │ Arnie                       │    7.0 │
-- │ Barefoot in the Park        │    6.6 │
-- │ The Best of Everything      │    8.0 │
-- ╰─────────────────────────────┴────────╯

-- Command:
.schema genres
-- Output:
-- CREATE TABLE genres (
--     show_id INTEGER NOT NULL,
--     genre TEXT NOT NULL,
--     FOREIGN KEY(show_id) REFERENCES shows(id)
-- );

-- Query:
SELECT * FROM genres LIMIT 10;
--Output:
-- ╭─────────┬───────────╮
-- │ show_id │   genre   │
-- ╞═════════╪═══════════╡
-- │   62614 │ Comedy    │
-- │   63881 │ Adventure │
-- │   63881 │ Comedy    │
-- │   63881 │ Family    │
-- │   63962 │ Action    │
-- │   63962 │ Sci-Fi    │
-- │   65269 │ Family    │
-- │   65269 │ Fantasy   │
-- │   65270 │ Comedy    │
-- │   65270 │ Sci-Fi    │
-- ╰─────────┴───────────╯

-- Query:
SELECT * FROM shows WHERE id = 63881;
--Output:
-- ╭───────┬───────────┬──────┬──────────╮
-- │  id   │   title   │ year │ episodes │
-- ╞═══════╪═══════════╪══════╪══════════╡
-- │ 63881 │ Catweazle │ 1970 │       26 │
-- ╰───────┴───────────┴──────┴──────────╯


/*
  2. One-to-Many:
    When a single record in one table is associated with multiple records in another table.
*/

-- Query:
SELECT genre FROM genres WHERE show_id = 63881;
--Output:
-- ╭───────────╮
-- │   genre   │
-- ╞═══════════╡
-- │ Adventure │
-- │ Comedy    │
-- │ Family    │
-- ╰───────────╯

-- Query:
SELECT genre FROM genres WHERE show_id = (
  SELECT id FROM shows WHERE title = 'Catweazle'
);
--Output:
-- ╭───────────╮
-- │   genre   │
-- ╞═══════════╡
-- │ Adventure │
-- │ Comedy    │
-- │ Family    │
-- ╰───────────╯

-- Query:
SELECT title, genre FROM shows
JOIN genres ON shows.id = genres.show_id
WHERE id = 63881;
--Output:
-- ╭───────────┬───────────╮
-- │   title   │   genre   │
-- ╞═══════════╪═══════════╡
-- │ Catweazle │ Adventure │
-- │ Catweazle │ Comedy    │
-- │ Catweazle │ Family    │
-- ╰───────────┴───────────╯

-- Query:
SELECT title FROM shows
JOIN genres ON shows.id = genres.show_id
WHERE id = 63881;
--Output:
-- +-----------+
-- |   title   |
-- +-----------+
-- | Catweazle |
-- | Catweazle |
-- | Catweazle |
-- +-----------+

/*
  3. Many-to-Many
    When multiple records in one table are associated with multiple records in another.
*/

-- Query:
SELECT * FROM shows WHERE title = 'The Office';
--Output:
-- +----------+------------+------+----------+
-- |    id    |   title    | year | episodes |
-- +----------+------------+------+----------+
-- | 112108   | The Office | 1995 | 6        |
-- | 290978   | The Office | 2001 | 14       |
-- | 386676   | The Office | 2005 | 188      |
-- | 1791001  | The Office | 2010 | 30       |
-- | 2186395  | The Office | 2012 | 8        |
-- | 8305218  | The Office | 2019 | 28       |
-- | 10193026 | The Office | 2024 | 8        |
-- | 20877972 | The Office | 2022 | 20       |
-- +----------+------------+------+----------+

-- Query:
SELECT * FROM shows WHERE title = 'The Office' AND year = 2005;
--Output:
-- +--------+------------+------+----------+
-- |   id   |   title    | year | episodes |
-- +--------+------------+------+----------+
-- | 386676 | The Office | 2005 | 188      |
-- +--------+------------+------+----------+

-- Query:
SELECT id FROM shows WHERE title = 'The Office' AND year = 2005;
--Output:
-- +--------+
-- |   id   |
-- +--------+
-- | 386676 |
-- +--------+


-- Query:
SELECT person_id FROM stars WHERE show_id = 386676;
-- Output:
-- +-----------+
-- | person_id |
-- +-----------+
-- | 136797    |
-- | 278979    |
-- | 1024677   |
-- | 933988    |
-- | 1534715   |
-- | 1580911   |
-- | 1526554   |
-- | 1526554   |
-- | 1526554   |
-- | 281212    |
-- | 809613    |
-- | 809613    |
-- | 105588    |
-- +-----------+

-- Query:
SELECT person_id FROM stars WHERE show_id = (
  SELECT id FROM shows WHERE title = "The Office" AND year = 2005
);
-- Output:
-- +-----------+
-- | person_id |
-- +-----------+
-- | 136797    |
-- | 278979    |
-- | 1024677   |
-- | 933988    |
-- | 1534715   |
-- | 1580911   |
-- | 1526554   |
-- | 1526554   |
-- | 1526554   |
-- | 281212    |
-- | 809613    |
-- | 809613    |
-- | 105588    |
-- +-----------+

-- Query:
SELECT name FROM people WHERE id IN (
  SELECT person_id FROM stars WHERE show_id = (
    SELECT id FROM shows WHERE title = 'The Office' AND year = 2005
  ) 
);
-- Output:
-- +--------------------+
-- |        name        |
-- +--------------------+
-- | Creed Bratton      |
-- | Steve Carell       |
-- | Jenna Fischer      |
-- | Kate Flannery      |
-- | Phyllis Smith      |
-- | Rainn Wilson       |
-- | John Krasinski     |
-- | Angela Kinsey      |
-- | Leslie David Baker |
-- | Brian Baumgartner  |
-- +--------------------+

-- Query:
SELECT * FROM people WHERE name = 'Steve Carell';
-- Output:
-- +--------+--------------+-------+
-- |   id   |     name     | birth |
-- +--------+--------------+-------+
-- | 136797 | Steve Carell | 1962  |
-- +--------+--------------+-------+

-- Query:
SELECT id FROM people WHERE name = 'Steve Carell';
-- Output:
-- +--------+
-- |   id   |
-- +--------+
-- | 136797 |
-- +--------+

-- Query:
SELECT show_id FROM stars WHERE person_id = (
  SELECT id FROM people WHERE name = 'Steve Carell'
);
-- Output:
-- +----------+
-- | show_id  |
-- +----------+
-- | 115148   |
-- | 115148   |
-- | 118420   |
-- | 306410   |
-- | 381741   |
-- | 386676   |
-- | 428108   |
-- | 804423   |
-- | 12054924 |
-- | 12054924 |
-- | 12054924 |
-- | 1489335  |
-- | 1618221  |
-- | 2012383  |
-- | 2051662  |
-- | 2294818  |
-- | 2567084  |
-- | 30826447 |
-- | 31037437 |
-- | 3565412  |
-- | 3590460  |
-- | 4944600  |
-- | 5533446  |
-- | 5706648  |
-- | 9612516  |
-- +----------+

-- Query:
SELECT title FROM shows WHERE id IN (
  SELECT show_id FROM stars WHERE person_id = (
    SELECT id FROM people WHERE name = 'Steve Carell'
  )
);
-- Output:
-- +------------------------------------+
-- |               title                |
-- +------------------------------------+
-- | The Dana Carvey Show               |
-- | Over the Top                       |
-- | Watching Ellie                     |
-- | Come to Papa                       |
-- | The Office                         |
-- | Entertainers with Byron Allen      |
-- | The Naked Trucker and T-Bones Show |
-- | ES.TV HD                           |
-- | Mark at the Movies                 |
-- | Inside Comedy                      |
-- | Rove LA                            |
-- | Metacafe Unfiltered                |
-- | Fabrice Fabrice Interviews         |
-- | Riot                               |
-- | Séries express                     |
-- | Hollywood Sessions                 |
-- | IMDb First Credit                  |
-- | First Impressions with Dana Carvey |
-- | Space Force                        |
-- | Some Good News                     |
-- | The Four Seasons                   |
-- | The Envelope: Oscar Roundtables    |
-- +------------------------------------+

-- Query:
SELECT title FROM shows
JOIN stars ON shows.id = stars.show_id
JOIN people ON stars.person_id = people.id
WHERE name = 'Steve Carell';
-- Output:
-- +------------------------------------+
-- |               title                |
-- +------------------------------------+
-- | The Dana Carvey Show               |
-- | The Dana Carvey Show               |
-- | Over the Top                       |
-- | Watching Ellie                     |
-- | Come to Papa                       |
-- | The Office                         |
-- | Entertainers with Byron Allen      |
-- | The Naked Trucker and T-Bones Show |
-- | Some Good News                     |
-- | Some Good News                     |
-- | Some Good News                     |
-- | ES.TV HD                           |
-- | Mark at the Movies                 |
-- | Inside Comedy                      |
-- | Rove LA                            |
-- | Metacafe Unfiltered                |
-- | Fabrice Fabrice Interviews         |
-- | The Four Seasons                   |
-- | The Envelope: Oscar Roundtables    |
-- | Riot                               |
-- | Séries express                     |
-- | Hollywood Sessions                 |
-- | IMDb First Credit                  |
-- | First Impressions with Dana Carvey |
-- | Space Force                        |
-- +------------------------------------+

-- Query:
SELECT title FROM shows, stars, people
WHERE shows.id = stars.show_id
AND stars.person_id = people.id
AND name = 'Steve Carell';
-- Output:
-- +------------------------------------+
-- |               title                |
-- +------------------------------------+
-- | The Dana Carvey Show               |
-- | The Dana Carvey Show               |
-- | Over the Top                       |
-- | Watching Ellie                     |
-- | Come to Papa                       |
-- | The Office                         |
-- | Entertainers with Byron Allen      |
-- | The Naked Trucker and T-Bones Show |
-- | Some Good News                     |
-- | Some Good News                     |
-- | Some Good News                     |
-- | ES.TV HD                           |
-- | Mark at the Movies                 |
-- | Inside Comedy                      |
-- | Rove LA                            |
-- | Metacafe Unfiltered                |
-- | Fabrice Fabrice Interviews         |
-- | The Four Seasons                   |
-- | The Envelope: Oscar Roundtables    |
-- | Riot                               |
-- | Séries express                     |
-- | Hollywood Sessions                 |
-- | IMDb First Credit                  |
-- | First Impressions with Dana Carvey |
-- | Space Force                        |
-- +------------------------------------+


-- INDEXES

-- Command:
.timer ON

-- Query:
SELECT * FROM shows WHERE title = 'The Office';
-- Output:
-- +----------+------------+------+----------+
-- |    id    |   title    | year | episodes |
-- +----------+------------+------+----------+
-- | 112108   | The Office | 1995 | 6        |
-- | 290978   | The Office | 2001 | 14       |
-- | 386676   | The Office | 2005 | 188      |
-- | 1791001  | The Office | 2010 | 30       |
-- | 2186395  | The Office | 2012 | 8        |
-- | 8305218  | The Office | 2019 | 28       |
-- | 10193026 | The Office | 2024 | 8        |
-- | 20877972 | The Office | 2022 | 20       |
-- +----------+------------+------+----------+
-- Run Time: real 0.029 user 0.020093 sys 0.004830

-- INDEX SYNTAX:
CREATE INDEX name ON table (column, ...);

-- Query:
CREATE INDEX title_index ON shows (title);
-- Output:
-- Run Time: real 0.127 user 0.097510 sys 0.015510

-- Query:
SELECT * FROM shows WHERE title = 'The Office';
-- Output:
-- +----------+------------+------+----------+
-- |    id    |   title    | year | episodes |
-- +----------+------------+------+----------+
-- | 112108   | The Office | 1995 | 6        |
-- | 290978   | The Office | 2001 | 14       |
-- | 386676   | The Office | 2005 | 188      |
-- | 1791001  | The Office | 2010 | 30       |
-- | 2186395  | The Office | 2012 | 8        |
-- | 8305218  | The Office | 2019 | 28       |
-- | 10193026 | The Office | 2024 | 8        |
-- | 20877972 | The Office | 2022 | 20       |
-- +----------+------------+------+----------+
-- Run Time: real 0.002 user 0.000215 sys 0.000486

/*
  How does INDEX Work?

  Index is explained as a supplementary data structure, typically a B-Tree, that the database maintains to significantly accelerate data retrieval by providing a shortcut to specific rows. Without an index, the database must perform a linear "full table scan" ($O(n)$), checking every record one by one, which becomes increasingly slow as the dataset grows into the millions; however, by creating an index on frequently searched columns like title or name, the database can navigate a sorted hierarchy to find data in logarithmic time ($O(\log n)$), reducing millions of operations to just a few dozen. While this transition from "scanning" to "searching" makes read operations nearly instantaneous, it involves a trade-off where the database requires additional disk space for storage and experiences slightly slower write speeds, as the index must be updated every time data is inserted or deleted.
*/

