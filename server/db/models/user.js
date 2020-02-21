const Sequelize = require('sequelize');
const db = require('../database');
const { STRING, UUID, UUIDV4, INTEGER, ENUM } = Sequelize;
const User = db.define('users', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    defaultValue: 'guestEmail@gmail.com',
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: true,
    defaultValue: 'guestPwd',
  },
  userType: {
    type: STRING,
    values: ['admin', 'user'],
    allowNull: false,
    defaultValue: 'regular',
    validate: {
      notEmpty: true,
    },
  },
  github_access_token: {
    type: STRING,
    allowNull: true,
  },
});
module.exports = User;
