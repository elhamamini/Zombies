const Sequelize = require('sequelize');
const db = require('../database');

const Conversation = db.define('conversation', {
  title: {
    type: Sequelize.TEXT,
    allowNull: true,
  },

  hasAnswer: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  repo: {
    type: Sequelize.TEXT,
    allowNull: true,
  },

  views: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  seen: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  replyCount: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getReplies().length;
    },
  },
});

module.exports = Conversation;
