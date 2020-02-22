const Sequelize = require('sequelize');
const db = require('../database');
const { STRING, UUID, UUIDV4 } = Sequelize;

const Conversation = db.define('conversation', {
    //This field will likely deprecate in favor of the userId
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    topic: {
        type: STRING,
        defaultValue: ''
    },
});

module.exports = Conversation;