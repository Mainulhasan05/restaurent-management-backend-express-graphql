import { DataTypes } from 'sequelize';
import sequelize from '../db_config/db.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  },
  phone:{
    type:DataTypes.STRING
  },
  role:{
    type: DataTypes.SMALLINT,
  },
  status:{
    type: DataTypes.SMALLINT,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
  },
  image: {
    type: DataTypes.STRING,
  },
});

export default User;