const Sequelize = require('sequelize');
const db = require('../database');

const Activity = db.define('activity', {
    category: {
        type: Sequelize.ENUM('like', 'reply'),
    },
});

module.exports = Activity;