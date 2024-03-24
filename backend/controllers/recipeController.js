const db = require('../models');
const Recipe = db.recipes;
const { matchedData } = require("express-validator");
const { deleteFile } = require("../services/fileDeletionService");

const getRecipes = (req, res) => {
    const page = matchedData(req, { includeOptionals: true }).page || 1;
    const pageSize = 5;
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
      });
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
  };
  

  const getRecipe = (req, res) => {
    const { id } = matchedData(req);
    
    Recipe.findByPk(id)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).json({ message: "Recipe not found" });
        }
        
        res.status(200).json(recipe);
      })
      .catch(error => {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  };
  

  const addRecipe = (req, res) => {
    const { title, description, instructions, ingredients, prepTime, cookTime, servingSize } = matchedData(req);
    
    const selectedIngredients = ingredients.map(item => ({
      name: item.name,
      quantity: item.quantity
    }));
    
    Recipe.create({
      title,
      description,
      instructions,
      ingredients: selectedIngredients,
      prepTime,
      cookTime,
      servingSize,
      imageName: req.file.filename,
      userId: req.userId
    })
    .then(() => {
      res.status(201).json({ message: 'Recipe added successfully' });
    })
    .catch(error => {
      console.error('Error adding recipe:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
  };
  

  const deleteRecipe = (req, res) => {
    const { id } = matchedData(req);
    
    Recipe.findByPk(id)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).json({ message: "Recipe not found" });
        }
        
        if (req.isAdmin === false && req.userId !== recipe.userId) {
          return res.status(403).json({ message: "User not permitted" });
        }
        
        recipe.destroy()
          .then(() => {
            deleteFile(recipe.imageName)
             .then(()=>{
                res.status(204).end();
             })
          })
      })
      .catch(error => {
        console.error("Error fetching recipe for deletion:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  };
  

module.exports = { getRecipes, getRecipe, addRecipe, deleteRecipe };