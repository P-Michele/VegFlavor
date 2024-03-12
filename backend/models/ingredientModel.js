//const User = require("./userModel.js");

module.exports = (sequelize, Sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        instructions: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        prepTime: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        cookTime: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        servingSize: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
      });

      //Recipe.belongsTo(User);

      return Recipe;
};