//const Recipe = require("./recipeModel.js");

module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
      "User", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        isAdmin:{
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        name: {
          type: DataTypes.STRING
        },
        surname:{
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
          //unique e validate
        },
        password: {
          type: DataTypes.STRING
        }
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );

    //User.hasMany(Recipe, {as: "recipes"});

    return User;
  };