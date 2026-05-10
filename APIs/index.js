// Structuring API Requests
// link -> https://bored-api.appbrewery.com/

/*
  API Endpoints
    API endpoints are the URLs your server exposes so clients (browser, mobile app, frontend, Postman, etc.) can interact with your backend.

    Think of them as doors/functions of your server.

    Syntax:
      baseUrl/endpoint -> This can be /random or /filter or anything else

    Example:
      https://bored-api/appbrewery.com/random

  Query Parameters
    Query parameters are extra data added to a URL after a ?.

    They help send small pieces of information to the server.

    Syntax:
      baseUrl/endpoint?query=value

    We can also have Multiple Query Parameters
    Syntax:
      baseUrl/endpoint?query=value&query2=value2

    Example:
      https://bored-api.appbrewery.com/filter?activity=socail&participants=2

  Path Parameters
    Path parameters (also called route parameters) are values embedded directly inside the URL path.

    They usually identify a specific resource.

    Syntax:
      baseUrl/endpoint/{path-parameter}

    Example:
      https://bored-api.appbrewery.com/activity/3943506
*/

/*
  JSON (JavaScript Object Notation)

  What is JSON ?
    JSON (JavaScript Object Notation) is a format used to store and exchange data between systems, especially between a client and a server.

    It is written as text, but structured in a way that is easy for both humans and machines to read.
*/

// JSON vs JavaScript Object

// JSON
// GOTO -> example.json

// JavaScript Object
const obj = {
  name: "Kunal",
  age: 22,
  city: "Mumbai",
  education: [
    {
      degree: "MCA",
      university: "Vidyavihar University",
    },
    {
      degree: "BSc IT",
      university: "Mumbai University",
    },
  ],
};

/*
  Analogy

  Imagine water.

  JavaScript object
    Water inside a glass:
      - usable immediately
      - interactive
  
  JSON
    Water bottle for transport:
      - portable
      - standardized
      - transferable

  You don’t drink from shipping pipes.
  You don’t transport open glasses across countries.

  Different purposes.

  - JavaScript objects are better for programming logic.
  - JSON is better for transferring data between systems.
*/

// JSON is difficult to read for humans so go to a JSON Visualizer for better understanding

// Converting JS Object -> JSON
const jsonData = JSON.stringify(obj);
// converts a JavaScript object into a JSON string.
console.log(jsonData);
/*
  Output:
  {"name":"Kunal","age":22,"city":"Mumbai","education":[{"degree":"MCA","university":"Vidyavihar University"},{"degree":"BSc IT","university":"Mumbai University"}]}
*/

// Converting JSON -> JS Object
const json = require("./example.json"); // Adding the JSON file
// Above LOC automatically converts JSON into JS Object

const jsonString = `{"name": "Kunal", "age":22}`;
const data = JSON.parse(jsonString);
// converts a JSON string into a JavaScript object.
console.log(data);
/*
  Output:
  { name: 'Kunal', age: 22 }
*/
