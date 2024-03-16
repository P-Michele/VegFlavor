const db = require('../models');
const Recipe = db.recipes;

const getRecipes = (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = 5;
    if (page <= 0) {
        return res.status(400).json({ message: 'Invalid page value' });
    }
    const offset = (page - 1) * pageSize;
    Recipe.findAndCountAll({
        limit: pageSize,
        offset: offset
    })
        .then(result => {
            const recipes = result.rows;
            const totalRecipes = result.count;
            const totalPages = Math.ceil(totalRecipes / pageSize);

            if (page > totalPages) {
                return res.status(404).json({ message: 'Page not found' });
            }

            res.status(200).json({
                page,
                pageSize,
                totalRecipes,
                totalPages,
                recipes
            })
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const getRecipe = (req, res) => {
    const recipeId = req.params.id;

    Recipe.findByPk(recipeId)
        .then(recipe => {
            if (!recipe) {
                return res.status(404).json({ message: "Recipe not found" }); // If recipe not found, return 404 status
            }
            res.json(recipe);
        })
        .catch(error => {
            console.error("Error fetching recipe:", error);
            res.status(500).json({ message: "Internal server error" });
        });
};


module.exports = { getRecipes, getRecipe };