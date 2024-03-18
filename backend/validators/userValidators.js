const { body } = require('express-validator');
const {validationErrorHandler} = require("../middlewares/validationResultMiddleware");

const loginUserValidator = [
    body('email')
        .isString().withMessage('Email must be a string')
        .trim()
        .notEmpty().withMessage('Email cannot be empty')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail()
        .escape(),
    body('password')
        .isString().withMessage('Password must be a string')
        .notEmpty().withMessage('Password cannot be empty')
        .isStrongPassword().withMessage('Weak password'),
    validationErrorHandler
];

const registerUserValidator = [
    body('name')
        .isString().withMessage('Name must be string')
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .escape(),
    body('surname')
        .isString().withMessage('Surname must be string')
        .trim()
        .notEmpty().withMessage('Surname cannot be empty')
        .escape(),
    loginUserValidator
];


module.exports = { registerUserValidator, loginUserValidator };