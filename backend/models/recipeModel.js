module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("recipe", {
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
        ingredients: {
          type: DataTypes.JSON,
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
        imageName: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        timestamps: true
      }
    );

      return Recipe;
};