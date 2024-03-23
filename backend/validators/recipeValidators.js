const { body, query, param } = require('express-validator');
const { validationErrorHandler } = require("../middlewares/validationResultMiddleware");

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
        .isString().withMessage('Title must be string')
        .trim()
        .notEmpty().withMessage('Title cannot be empty')
        .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters')
        .escape(),
    body('description')
        .isString().withMessage('Description must be string')
        .trim()
        .notEmpty().withMessage('Description cannot be empty')
        .escape(),
    body('instructions')
        .isString().withMessage('Instructions must be string')
        .trim()
        .notEmpty().withMessage('Instructions cannot be empty')
        .escape(),
    body('ingredients')
        .isArray().withMessage('Ingredients must be an array'),
    body('ingredients.*')
        .isObject().withMessage('Ingredients items must be objects'),
    body('ingredients.*.name')
        .isString().withMessage('Ingredient name must be string')
        .trim()
        .notEmpty().withMessage('Ingredient name cannot be empty')
        .escape(),
    body('ingredients.*.quantity')
        .isInt({ min: 1 }).withMessage('Missing or invalid ingredient quantity (positive integer)'),
    body('prepTime')
        .isInt({ min: 1 }).withMessage('Missing or invalid preparation time (positive integer)'),
    body('cookTime')
        .isInt({ min: 1 }).withMessage('Missing or invalid cooking time (positive integer)'),
    body('servingSize')
        .isInt({ min: 1 }).withMessage('Missing or invalid serving size (positive integer)r'),
    validationErrorHandler
];

const deleteRecipeValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage("recipe id must be a positive integer"),
    validationErrorHandler
];

module.exports = { getRecipesValidator, getRecipeValidator, addRecipeValidator, deleteRecipeValidator };