module.exports = (sequelize, Sequelize, DataTypes) => {
    const Ingredient = sequelize.define("ingredient", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calories: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true
    });

    return Ingredient;
};