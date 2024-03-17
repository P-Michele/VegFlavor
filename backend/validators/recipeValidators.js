const { body, query, param } = require('express-validator');
const {validationErrorHandler} = require("../middlewares/validationResultMiddleware");

const getRecipesValidator = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage("Page number must be a positive integer"),
    validationErrorHandler
];

const getRecipeValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage("recipe id must be a positive integer"),
    validationErrorHandler
];

const addRecipeValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title cannot be empty')
        .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters')
        .escape(),
    body('description')
        .trim()
        .notEmpty().withMessage('Description cannot be empty')
        .escape(),
    body('instructions')
        .trim()
        .notEmpty().withMessage('Instructions cannot be empty')
        .escape(),
    body('ingredients')
        .trim()
        .notEmpty().withMessage('Ingredients cannot be empty')
        .escape(),
    body('prepTime')
        .isInt({ min: 0 }).withMessage('Prep time must be a positive integer'),
    body('cookTime')
        .isInt({ min: 0 }).withMessage('Cook time must be a positive integer'),
    body('servingSize')
        .isInt({ min: 0 }).withMessage('Serving size must be a positive integer'),
    validationErrorHandler
];

module.exports = { getRecipesValidator, getRecipeValidator, addRecipeValidator };