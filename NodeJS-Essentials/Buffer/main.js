// Buffer Module
/* 
In Node.js, the Buffer module is used to handle binary data. A Buffer object represents a fixed amount of memory that cannot be resized.

NOTE: While the Buffer module is available within the global scope, the Node documentation still recommends importing it explicitly.
*/

const { Buffer } = require('buffer');

/* 
The Buffer module provides various methods for handling binary data, such as 
alloc, toString, from, and concat.
*/

// alloc
/* 
The .alloc() method creates (or allocates) a new Buffer object with a specified size. .alloc() accepts three arguments:

 - size (required): the number of bytes the buffer will hold

 - fill (optional): a value to fill the buffer with, accepts strings and integers, among a few other types — defaults to 0

 - encoding (optional): the text encoding that should be used to interpret the fill argument when it is a string value. defaults to 'utf-8'

*/

const buffer = Buffer.alloc(5);
console.log(buffer); // Output: <Buffer 00 00 00 00 00>

// toString
/* 
The .toString() method translates the Buffer object into a human-readable string. It accepts three optional arguments:

 - encoding (optional): the text encoding that should be used to transform the buffer into a string. defaults to 'utf-8'

 - start (optional): the byte offset to begin transforming the Buffer object, inclusive — default is 0, the beginning of the buffer

 - end (optional): the byte offset to end transforming the Buffer object, exclusive — default is the length of the buffer

*/

const buffer2 = Buffer.alloc(5, 'a');
console.log(buffer2.toString()); // Output: aaaaa

// from
/* 
The .from() method is provided to create a new Buffer object from the specified string, array, or buffer. The .from() method has several different signatures for the various input types it can take, but we will focus on the signature for creating a buffer from a string, which accepts two arguments:

 - string (required): an object from which the buffer will be made
 - encoding (optional): the text encoding of the provided string — defaults to 'utf-8'

*/

const buffer3 = Buffer.from('hello');
console.log(buffer3); // Output: <Buffer 68 65 6c 6c 6f>

// concat
/* 
The .concat() method joins an array of Buffer objects into a single Buffer object. .concat() comes in handy because a Buffer object can’t be resized. This method accepts two arguments:

 - list (required): an array containing Buffer objects

 - totalLength (optional): specifies the exact total length of the concatenated buffer — if the concatenated length is greater, the result is truncated, and if it is less, the remaining indices are filled with zeroes
*/

const buffer4 = Buffer.from('Hello'); // <Buffer 48 65 6c 6c 6f>

const buffer5 = Buffer.from('world'); // <Buffer 77 6f 72 6c 64>

const array = [buffer4, buffer5]; // [ <Buffer 48 65 6c 6c 6f>, <Buffer 77 6f 72 6c 64> ]

const bufferConcat = Buffer.concat(array, 9);

console.log(bufferConcat); // Output: <Buffer 48 65 6c 6c 6f 77 6f 72 6c>
console.log(bufferConcat.toString()); // Output: Helloworl