const express = require("express");
const {registerUser, loginUser, getUserRecipes} = require("../controllers/userController");
const {registerUserValidator, loginUserValidator} = require("../validators/userValidators");
const {verifyToken} = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.post("/login", loginUserValidator, loginUser);
router.get("/recipes", verifyToken, getUserRecipes);

module.exports = router;