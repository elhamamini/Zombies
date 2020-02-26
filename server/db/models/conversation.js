const Sequelize = require('sequelize');
const db = require('../database');
const { STRING, UUID, UUIDV4, INTEGER } = Sequelize;

const Conversation = db.define('conversation', {
  //This field will likely deprecate in favor of the userId
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  views: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['default'],
  },
});

module.exports = Conversation;
