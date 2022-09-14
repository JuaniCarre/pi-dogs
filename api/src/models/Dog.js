const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxAge:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull:true
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }
  });
};
