const Sequelize = require('sequelize');
const db = require('../database');

const { STRING, TEXT, BOOLEAN } = Sequelize;

const User = db.define('users', {
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

  image: {
    type: TEXT,
    defaultValue:
      'https://ayc.ddl.mybluehost.me/wp-content/uploads/2018/04/coming-soon.png',
  },

  github_access_token: {
    type: STRING,
    required: false,
    allowNull: true,
  },

  githubUsername: {
    type: STRING,
    allowNull: true,
  },

  reposUrl: {
    type: STRING,
    allowNull: true,
  },

  bio: {
    type: STRING,
    allowNull: true,
  },

  sessionId: {
    type: STRING,
    allowNull: true,
  },

  loggedIn: {
    type: BOOLEAN,
    defaultValue: false,
  },
});
module.exports = User;
