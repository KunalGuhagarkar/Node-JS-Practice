// Timers Module
// The timers module is globally available, so we do not need to import it to use its methods.

/* 
When setImmediate() is called, it executes the specified callback function after the current poll phase of the event loop is completed.

setImmediate() accepts one to many parameters:

 - callback (required): the function that will be executed once the poll phase is complete
 - arguments (optional): zero or more arguments that will be passed, in order, to the callback when it is called

*/

setImmediate(() => {
    console.log('Hello, My Name is Kunal');
});

console.log('Will this line print before or after');

/*
When a file is first executed, all of its top-level statements are evaluated in order as part of the poll phase. Since setImmediate() callbacks are pushed to after the poll phase is complete, any other top-level statements will run first.

Therefore, we see that the line Will this line print before or after? actually prints before Hello! My name is Codey..
*/

/*
setTimeout() and setInterval() work similarly to each other and accept the same parameters:

 - callback (required): the function that will be executed after the delay is complete

 - delay (optional): the amount of time, in milliseconds, to wait before executing the callback function — defaults to 1

 - arguments (optional): zero or more arguments that will be passed, in order, to the callback when it is called

*/

/* 
Note: In Node.js, timer callbacks may only be executed during designated phases of the event loop. Each time the loop iterates, it will check any existing timers to see if their delays have elapsed and execute them if so. But because other phases of the event can be blocking, there is no guarantee that a timer callback will execute exactly after its delay period, only that it will execute at some time after the delay period, the next time the appropriate phase is reached.
*/

setTimeout(() => {
    console.log('This will get called after 1 second.');
}, 1000);

setInterval(() => {
    console.log('This will get called after Every 5 seconds.');
}, 5000);

/* 
Here, the callback for setTimeout() will execute once after a single second has elapsed. On the other hand, the callback for setInterval() will continuously execute every five seconds.
*/

/* 
What if we need to stop an interval, though, or cancel a timeout or immediate before it executes? For each of the timer functions, there is a corresponding clearing function, which allows us to cancel the timer.
*/

let iterations = 0;
const interval = setInterval(() => {
    console.log('This gets called after 1 second.');
    iterations++;
    if(iterations == 5) {
        console.log('Cancelling Intervals');
        clearInterval(interval);
    }
}, 1000);