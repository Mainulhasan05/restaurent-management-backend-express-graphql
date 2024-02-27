const { DataTypes } = require('sequelize');
const sequelize = require('../db_config/db');

const Booking = sequelize.define('Booking', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
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

module.exports = Booking;