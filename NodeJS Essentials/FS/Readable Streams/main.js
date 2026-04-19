// Readable Streams
// Streaming = process data piece-by-piece instead of all at once

const readline = require('readline');
const fs = require('fs');

/*
To read files line-by-line, we can use the .createInterface() method from the readline core module. .createInterface() returns an EventEmitter set up to emit 'line' events:
*/

const myInterface = readline.createInterface({
    input: fs.createReadStream('text.txt')
});

myInterface.on('line', (fileline) => {
    console.log(`This line reads: ${fileline}`);
});

/* 
Output:
This line reads: This is a text file.
This line reads: It is created by Kunal.
*/