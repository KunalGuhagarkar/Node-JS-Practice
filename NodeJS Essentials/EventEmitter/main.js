// Events Module

// import the events core module
const events = require('events');

// create an instance of EventEmitter class
let myEmitter = new events.EventEmitter();

let newUserListener = (data) => {
    console.log(`We have a new user: ${data}`);
}

myEmitter.on('new user', newUserListener);

myEmitter.emit('new user', 'Kunal The Great');
