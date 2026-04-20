// Http Module
/*
The http module includes various methods that are useful for engaging with HTTP network requests and responses. One of the most commonly used methods within the http module is the 
.createServer() method. This method is responsible for doing exactly what its namesake implies — it creates an HTTP server.
*/

const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Server is running.');
});

server.listen(3000, () => {
    console.log(`Server Running on http://localhost:3000/`);
});

