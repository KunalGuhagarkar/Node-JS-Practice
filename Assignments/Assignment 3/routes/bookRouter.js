// Book Router
const { Router } = require("express");

const bookRouter = Router();

bookRouter.get("/", (req, res) => res.send("All books"));

bookRouter.get("/:bookName", (req, res) => {
  const { bookName } = req.params;
  res.send(`Book name: ${bookName}`);
});

bookRouter.all("/:bookName/reserve", (req, res) => {
  const { bookName } = req.params;
  res.send(`Reserve Page and Book name: ${bookName}`);
});

module.exports = bookRouter;
