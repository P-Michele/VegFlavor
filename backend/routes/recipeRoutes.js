const express = require("express");
const getRecipes = require("../controllers/recipeController");
const router = express.Router();

router.get("/", getRecipes);

module.exports = router;