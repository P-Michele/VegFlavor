const express = require("express");
const {getRecipes, getRecipe, addRecipe} = require("../controllers/recipeController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", verifyToken, addRecipe);

module.exports = router;