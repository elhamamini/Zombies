const Sequelize = require('sequelize');
const db = require('../database');

const Activity = db.define('activity', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    category: {
        type: Sequelize.ENUM('like', 'reply'),
    },
});

module.exports = Activity;