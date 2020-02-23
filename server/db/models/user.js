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
  },
  email: {
    type: STRING,
    defaultValue: 'guestEmail@gmail.com',
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
