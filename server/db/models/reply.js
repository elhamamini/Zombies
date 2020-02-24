const Sequelize = require('sequelize');
const db = require('../database');
const moment = require('moment');

const { UUID, UUIDV4 } = Sequelize;

const Reply = db.define('reply', {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  repo: {
    type: Sequelize.TEXT,
  },
  codeSnippet: {
    type: Sequelize.TEXT,
  },
  postNumber: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  isFlagged: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  timeSincePosted: {
    type: Sequelize.VIRTUAL,
    get() {
      // TODO: HAVE THIS RETURN AS A TIME SINCE  NOW()
      return moment(this.createdAt).fromNow();
    },
  },
  timeSinceUpdated: {
    type: Sequelize.VIRTUAL,
    get() {
      //TODO: HAVE THIS RETURN AS A TIME SINCE NOW()
      return moment(this.updatedAt).fromNow();
    },
  },
});

module.exports = Reply;
