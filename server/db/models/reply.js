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
    body: {
        type: Sequelize.TEXT,
    },
    repo: {
        type: Sequelize.TEXT,
    },
    codeSnippet: {
        type: Sequelize.TEXT,
    },
    posted: {
        type: Sequelize.DATE,                
      get() {
            // TODO: HAVE THIS RETURN AS A TIME SINCE  NOW()
            return moment(this.getDataValue('posted')).format('h:mm');
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            //TODO: HAVE THIS RETURN AS A TIME SINCE NOW()
            return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
        }
    }
});

module.exports = Reply;