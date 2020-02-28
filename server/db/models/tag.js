const Sequelize = require('sequelize');
const db = require('../database');

const Tag = db.define('tag', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    count: {
        type: Sequelize.VIRTUAL,
        get() {
          return this.getConversations().length;
        }
      },
});

module.exports = Tag;