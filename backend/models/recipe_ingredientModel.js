module.exports = (sequelize, Sequelize, DataTypes) => {
    const Recipe_Ingredient = sequelize.define("recipes_ingredients", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }); 

    return Recipe_Ingredient;
};