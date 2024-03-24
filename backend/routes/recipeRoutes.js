const express = require("express");
const { getRecipes, getRecipe, addRecipe, deleteRecipe } = require("../controllers/recipeController");
const { getRecipesValidator, getRecipeValidator, addRecipeValidator, deleteRecipeValidator } = require("../validators/recipeValidators");
const { verifyToken } = require("../middlewares/authMiddleware");
const { uploadErrorHandler } = require("../middlewares/fileUploadMiddleware");
const { upload } = require("../configs/multerConfig");

const router = express.Router();

router.get("/", getRecipesValidator, getRecipes);
router.get("/:id", getRecipeValidator, getRecipe);
router.post("/", verifyToken, upload.single('image'), uploadErrorHandler, (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Missing file"
    });
  }
  req.body = JSON.parse(req.body.recipeData);
  next();
}, addRecipeValidator, addRecipe);
router.delete("/:id", verifyToken, deleteRecipeValidator, deleteRecipe);

module.exports = router;