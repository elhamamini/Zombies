const Sequelize = require('sequelize');
const db = require('../database');
const moment = require('moment');

const { UUID, UUIDV4 } = Sequelize;

const Reply = db.define('reply', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    likes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    title: {
        type: Sequelize.STRING,
    },
    body: {
        type: Sequelize.TEXT,
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
            return moment(this.getDataValue('createdAt')).format('h:mm');
        }
    },
    timeSinceUpdated: {
        type: Sequelize.VIRTUAL,
        get() {
            //TODO: HAVE THIS RETURN AS A TIME SINCE NOW()
            return moment(this.getDataValue('updatedAt')).format('h:mm:ss');
        }
    }
});

module.exports = Reply;