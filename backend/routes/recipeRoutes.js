const express = require("express");
const {getRecipes, getRecipe} = require("../controllers/recipeController");

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);

module.exports = router;