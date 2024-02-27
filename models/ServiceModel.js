const { DataTypes } = require('sequelize');
const sequelize = require('../db_config/db');

const Service = sequelize.define('Service', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  short_description:{
    type:DataTypes.TEXT
  },
  icon_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sort_value:{
    type:DataTypes.INTEGER
  },
  status:{
    type:DataTypes.SMALLINT
  },
});

module.exports = Service;