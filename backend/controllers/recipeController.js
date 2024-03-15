const db = require('../models');
const Recipe = db.recipes;

const getRecipes = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    const offset = (page - 1) * pageSize;
    Recipe.findAndCountAll({
        limit: pageSize,
        offset: offset
    }).then(result => {
        const recipes= result.rows;
        const totalRecipes= result.count;
        const totalPages = Math.ceil(totalRecipes/pageSize);
        return res.status(200).json({
            page,
            pageSize,
            totalRecipes,
            totalPages,
            recipes
        })
    })
};

module.exports=getRecipes;