// FS Module
/*
fs provides multiple APIs for handling file data in different ways:

 - a Callback API: methods that take error-first callback functions

 - a Promises API: methods that return a Promise to handle file data asynchronously, via fs.promises, which can be used with async/await or .then() / .catch() syntax

 - a Synchronous API: methods that synchronously handle file data


Most fs methods have a version in each of these APIs, allowing us to write code efficiently in whichever way we’d like. 
One such method allows us to read data from a file — the three forms in the same order are: 
 - fs.readFile(), 
 - fs.promises.readFile(), 
 - fs.readFileSync().
*/

const { readFile } = require("fs");

let readDataCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(`Provided file contained: ${data}`);
  }
};

readFile("./file.txt", "utf-8", readDataCallback);
// Output: Provided file contained: Hello this is kunal \nthis is a text file

readFile("./file2.txt", "utf-8", readDataCallback);
// Output: Something went wrong: Error: ENOENT: no such file or directory, open 'C:\Users\KUNAL\Desktop\Node\Practice\NodeJS Essentials\FS\file2.txt'

// Same functionality through Promises API
const { readFile } = require("fs/promises");

readFile("./file.txt", "utf-8")
  .then((data) => {
    console.log(`The file contains: ${data}`);
  })
  .catch((err) => {
    console.error(`Something went wrong: ${err}`);
  });
// Output: The file contains: Hello this is kunal \nthis is a text file

// Using Synchronous API
const { readFileSync } = require('fs');

let data;
try{
    data = readFileSync('./file.txt', 'utf-8');
    console.log(`Provided file contains: ${data}`);
} catch(error) {
    console.error(`Something went wrong: ${error}`);
}

/* 
Note: Regardless of which API we use, we must make sure to implement an error-handling technique in case something goes wrong (e.g., no file exists for the path we are trying to read).
*/