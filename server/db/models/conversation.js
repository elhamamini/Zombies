const Sequelize = require('sequelize');
const db = require('../database');
const { UUID, UUIDV4 } = Sequelize;

const Conversation = db.define('conversation', {

  uuid: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },

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
});

module.exports = Conversation;
