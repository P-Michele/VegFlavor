const { body } = require('express-validator');
const {validationErrorHandler} = require("../middlewares/validationResultMiddleware");

const loginUserValidator = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail()
        .escape(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isStrongPassword().withMessage('Weak password'),
    validationErrorHandler
];

const registerUserValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .escape(),
    body('surname')
        .trim()
        .notEmpty().withMessage('Surname is required')
        .escape(),
    loginUserValidator
];


module.exports = { registerUserValidator, loginUserValidator };