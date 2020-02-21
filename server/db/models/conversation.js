const Sequelize = require('sequelize');
const db = require('../database');
const { STRING, UUID, UUIDV4 } = Sequelize;

const Conversation = db.define('conversation', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    topic: {
        type: STRING,
    },
});

module.exports = Conversation;