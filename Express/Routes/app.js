// Routes
/*
Routes essentially just match a request’s HTTP verb (e.g. GET or POST) and URL path to the appropriate set of middleware functions - the controllers.
*/

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello, world!'));

app.post('/messages', (req, res) => res.send('This is where you can view your messages.'));

/*
That would tell us the route matches any POST requests to the /messages path of our app. If you sent a GET request to the /messages path, it would not match this route. Each HTTP verb has its own Express route method, and you can also use app.all() to make a route match all verbs.
*/

app.listen(3000, () => {
    console.log('Server Running on locahost:3000.');
});

/*
Paths

The first argument we pass a route is the path to match, which can either be a string or a regular expression.

With string paths, we can also use {} to make characters optional.
*/

// Matches both /message and /messages
// "/message{s}"

// Matches both / and /messages
// "/{messages}"

// Matches both /foo/baz and /foo/bar/baz
// "/foo{/bar}/baz"

// With * (a “splat” or “wildcard”), we can match any number of any characters. Splats in Express paths must always be followed by a name.

// A common use case for a splat would be as a catch-all for all otherwise unmatched paths, e.g. for custom 404 error handling.

// // Matches / and /odin as well as /sdds8fjsdifhj98sdfh
// "/{*splat}"

// app.all('/{*splat}', (req,res) => {
//     res.status(404).send('Error 404 Page not found');
// });

/*
Route Parameters

To denote a route parameter, we start a segment with a : followed by the name of the parameter (which can only consist of case-sensitive alphanumeric characters, or _). Whatever we name that route parameter, Express will automatically populate the req.params object in any of the following middleware functions with whatever value the path passed into the parameter, using the parameter name as its key.
*/

// app.get('/:username/messages', (req, res) => {
//     console.log(req.params);
//     res.end();
// });

/*
Output:
[Object: null prototype] { username: 'odin' }
*/

// app.get('/:username/messages/:messageId', (req, res) => {
//     console.log(req.params);
//     res.end();
// });

/*
Output:
[Object: null prototype] { username: 'odin', messageId: '67' }
*/

/*
Query Parameters

Query parameters are a unique and optional part of a URL that appear at the end. A ? denotes the start of the query parameters, with each query being a key-value pair with the format key=value, and each query separated by an &. They are special as they are not actually considered part of the path itself, but are essentially more like arguments we can pass in to a given path.

For example, /odin/messages?sort=date&direction=ascending will still match the route with the /:username/messages path, but we can access the sort=date and direction=ascending key-value pairs inside the middleware chain.
*/

app.get('/:username/messages', (req, res) => {
    console.log('Params:', req.params);
    console.log('Query:', req.query);
    res.end();
});

/*
Output:
Params: [Object: null prototype] { username: 'kunal' }
Query: [Object: null prototype] {
  sort: [ 'date', 'likes' ],
  direction: 'ascending'
}
*/