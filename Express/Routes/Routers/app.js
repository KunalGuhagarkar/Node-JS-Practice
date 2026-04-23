// app.js

const express = require('express');
const app = express();

const authorRouter = require('./routes.js');

app.use('/authors', authorRouter);

app.listen(3000, () => {
    console.log('Server Running on PORT 3000');
});