// index Router
const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send("Index Page"));

module.exports = indexRouter;
