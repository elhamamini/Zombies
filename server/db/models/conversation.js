const Sequelize = require('sequelize');
const db = require('../database');
const { STRING, UUID, UUIDV4 } = Sequelize;

const Conversation = db.define('conversation', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    author: {
        type: Sequelize.STRING,
    },
    views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    replies: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    topic: {
        type: STRING,
    },
});

module.exports = Conversation;