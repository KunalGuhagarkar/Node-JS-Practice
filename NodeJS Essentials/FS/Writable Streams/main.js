// Writable Streams

const fs = require('fs');

const fileStream = fs.createWriteStream('output.txt');

fileStream.write('This is the first line\n');
fileStream.write('This is the second line\n');
fileStream.end();

/*
Note: 
The .write() method does not add newline characters at the end of each line, so we made sure to insert them ourselves!
*/