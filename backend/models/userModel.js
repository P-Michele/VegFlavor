module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user", // Model name
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
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        surname:{
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        timestamps: true
      }
    );

    return User;
  };