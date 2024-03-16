const express = require('express');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/recipes', recipeRoutes);
router.use('/user', userRoutes);

module.exports = router;