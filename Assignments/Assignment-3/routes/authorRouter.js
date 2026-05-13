// Author Route
const { Router } = require("express");

const authorRouter = Router();

authorRouter.get("/", (req, res) => res.send("All authors"));

authorRouter.get("/:authorId", (req, res) => {
  const { authorId } = req.params;
  res.send(`Author Id: ${authorId}`);
});

module.exports = authorRouter;
