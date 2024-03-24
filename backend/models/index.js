const dbConfig = require("../configs/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");

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
db.sequelize = sequelize;

//Tables
db.users = require("./userModel.js")(sequelize, DataTypes);
db.recipes = require("./recipeModel.js")(sequelize, DataTypes);

//Relations

//One to many, user has recipes
db.users.hasMany(db.recipes);
db.recipes.belongsTo(db.users);

module.exports = db;