const Sequelize = require('sequelize');
const db = require('../database');
const moment = require('moment');

const { UUID, UUIDV4 } = Sequelize;

const Reply = db.define('reply', {
    username: {
        type: Sequelize.STRING,
    },
    likedBy: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    likesCount: {
        type: Sequelize.VIRTUAL,
        get() {
            return (this.likes.length);
        },
        set(value) {
            throw new Error('cannot set virtual field likesCount');
        }
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
            return moment(this.createdAt).fromNow();
        }
    },
    timeSinceUpdated: {
        type: Sequelize.VIRTUAL,
        get() {
            //TODO: HAVE THIS RETURN AS A TIME SINCE NOW()
            return moment(this.updatedAt).fromNow();
        }
    }
});

module.exports = Reply;