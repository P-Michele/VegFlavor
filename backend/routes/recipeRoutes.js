const express = require("express");
const {getRecipes, getRecipe, addRecipe} = require("../controllers/recipeController");
const {getRecipesValidator, getRecipeValidator, addRecipeValidator} = require("../validators/recipeValidators");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.png')
  }
})
const upload = multer({storage:storage});


router.get("/", getRecipesValidator, getRecipes);
router.get("/:id", getRecipeValidator, getRecipe);
router.post("/", verifyToken, upload.single('image'), (req, res, next)=>{
    if(!req.file){
        return res.status(400).json({"message":"Missing file"});
    }
    req.body=JSON.parse(req.body.recipeData);
    next();
}, addRecipeValidator, addRecipe);

module.exports = router;