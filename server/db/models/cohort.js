const Sequelize = require('sequelize');
const db = require('../database');

const Cohort = db.define('cohorts', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Cohort;
