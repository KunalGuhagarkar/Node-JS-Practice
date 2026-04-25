// app.js

const express = require('express');
const app = express();

const authorRouter = require('./routes/authorRouter.js');

app.use('/' ,authorRouter);

app.listen(3000);