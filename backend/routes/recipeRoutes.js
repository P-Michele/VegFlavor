const express = require("express");
const {getRecipes, getRecipe, addRecipe} = require("../controllers/recipeController");
const {getRecipesValidator, getRecipeValidator, addRecipeValidator} = require("../validators/recipeValidators");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getRecipesValidator, getRecipes);
router.get("/:id", getRecipeValidator, getRecipe);
router.post("/", verifyToken, addRecipeValidator, addRecipe);

module.exports = router;