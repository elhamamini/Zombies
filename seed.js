const { green, red } = require('chalk');
const { db } = require('./server/db/index');
const seed = async () => {
  try {
    await db.sync({ force: true });
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
