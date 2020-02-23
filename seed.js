const { green, red } = require('chalk');
const { db, User } = require('./server/db/index');
//sorry guys I didnt have your email addresses,feel free to change it
const usersList = [
  {
    name: 'alex',
    email: 'alexmorozoff@gmail.com',
    image:
      'https://media.istockphoto.com/photos/letter-a-3d-metal-isolated-on-white-picture-id675665120?k=6&m=675665120&s=612x612&w=0&h=AWInBRZaDyy1yzSQA1XiBH7phw_91VbfzIIrQjtwQEA=',
    password: 'abcde',
    userType: 'admin',
  },
  {
    name: 'elham',
    email: 'elhamfarvid@gmail.com',
    image:
      'https://steamuserimages-a.akamaihd.net/ugc/925925732343138045/E1DA6C6C91A4444D2BDCFA90B44FF78055DDE6F6/',
    password: 'abcde',
    userType: 'admin',
  },
  {
    name: 'shel',
    email: 'shelorock@gmail.com',
    image:
      'https://media.istockphoto.com/photos/the-letter-s-in-orange-flames-picture-id178625189?k=6&m=178625189&s=612x612&w=0&h=L1Gcg7mzxCW4uUmS9dpvscBGqpmLn5xvkGByD4mdrVI=',
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
