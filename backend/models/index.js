const dbConfig = require("../configs/dbConfig.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
 dbConfig.name,
 dbConfig.user,
 dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,

    poll:{
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

//Tables
db.users = require("./userModel.js")(sequelize, Sequelize, DataTypes);
db.recipes = require("./recipeModel.js")(sequelize, Sequelize, DataTypes);
db.ingredients = require("./ingredientModel.js")(sequelize, Sequelize, DataTypes);
db.recipes_ingredients = require("./recipe_ingredientModel.js")(sequelize, Sequelize, DataTypes);

//Relations

//One to many, user has recipes
db.users.hasMany(db.recipes);
db.recipes.belongsTo(db.users);

module.exports = db;