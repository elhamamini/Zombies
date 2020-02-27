const Sequelize = require('sequelize');
const db = require('../database');
const { STRING, UUID, UUIDV4, INTEGER } = Sequelize;

const Conversation = db.define('conversation', {
  //This field will likely deprecate in favor of the userId
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hasAnswer: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  repo: {
    type: Sequelize.TEXT,
  },
  views: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  replyCount: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getReplies().length;
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['default'],
  },
});

module.exports = Conversation;
