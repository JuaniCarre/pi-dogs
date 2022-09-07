const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.STRING,
      allownull:false,
    },
    minHeight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxHeight:{
      type: DataTypes.STRING,
      allowNull:false,
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
