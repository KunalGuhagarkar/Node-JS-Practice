// app.js
const express = require("express");
const app = express();
const authorRouter = require("./routes/authorRouter.js");
const bookRouter = require("./routes/bookRouter.js");
const indexRouter = require("./routes/indexRouter.js");

app.use('/', indexRouter);
app.use('/author', authorRouter);
app.use('/book', bookRouter);


app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server Running on Port 3000.`);
});
