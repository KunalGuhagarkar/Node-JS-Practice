const { Router } = require('express');
const { getAuthorById } = require('../controllers/authorController.js');

const authorRoutes = Router();

authorRoutes.get("/:authorId", getAuthorById);

module.exports = authorRoutes;