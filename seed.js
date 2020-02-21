const { green, red } = require('chalk');
const { db, User } = require('./server/db/index');
//sorry guys I didnt have your email addresses,feel free to change it
const usersList = [
  {
    name: 'alex',
    email: 'alexmorozoff@gmail.com',
    password: 'abcde',
    userType: 'admin',
  },
  {
    name: 'elham',
    email: 'elhamfarvid@gmail.com',
    password: 'abcde',
    userType: 'admin',
  },
  {
    name: 'shel',
    email: 'shelorock@gmail.com',
    password: 'abcde',
    userType: 'admin',
  },
];
const seed = async () => {
  try {
    await db.sync({ force: true });
    await User.bulkCreate(usersList);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
