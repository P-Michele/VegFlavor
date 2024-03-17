const express = require("express");
const {registerUser, loginUser} = require("../controllers/userController");
const {registerUserValidator, loginUserValidator} = require("../validators/userValidators");

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.post("/login", loginUserValidator, loginUser);

module.exports = router;