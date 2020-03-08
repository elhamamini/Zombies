const bcrypt = require('bcrypt');
const saltRounds = 12

const usersList = [
  {
    name: 'alex',
    email: 'alexmorozoff@gmail.com',
    image:
      'https://media.istockphoto.com/photos/letter-a-3d-metal-isolated-on-white-picture-id675665120?k=6&m=675665120&s=612x612&w=0&h=AWInBRZaDyy1yzSQA1XiBH7phw_91VbfzIIrQjtwQEA=',
    password: bcrypt.hashSync('abcde', saltRounds),
    userType: 'admin',
  },
  {
    name: 'elham',
    email: 'elhamfarvid@gmail.com',
    image:
      'https://steamuserimages-a.akamaihd.net/ugc/925925732343138045/E1DA6C6C91A4444D2BDCFA90B44FF78055DDE6F6/',
    password: bcrypt.hashSync('abcde', saltRounds),
    userType: 'admin',
  },
  {
    name: 'shel',
    email: 'shelorock@gmail.com',
    image:
      'https://media.istockphoto.com/photos/the-letter-s-in-orange-flames-picture-id178625189?k=6&m=178625189&s=612x612&w=0&h=L1Gcg7mzxCW4uUmS9dpvscBGqpmLn5xvkGByD4mdrVI=',
    password: bcrypt.hashSync('abcde', saltRounds),
    userType: 'admin',
  },
  {
    name: 'Kevin',
    email: 'kevinK@gmail.com',
    password: bcrypt.hashSync('abcde', saltRounds),
    userType: 'user',
  },
  {
    name: 'Sara',
    email: 'saraK@gmail.com',
    password: bcrypt.hashSync('abcde', saltRounds),
    userType: 'user',
  },
  {
    name: 'Mark',
    email: 'MarkK@gmail.com',
    password: bcrypt.hashSync('abcde', saltRounds),
    userType: 'user',
  },
  {
    name: 'Tiffany',
    email: 'tiffanyT@gmail.com',
    password: bcrypt.hashSync('abcde', saltRounds),
    userType: 'user',
  },
  {
    name: 'Jason',
    email: 'jsonK@gmail.com',
    password: bcrypt.hashSync('abcde', saltRounds),
    userType: 'user',
  },
];
module.exports = usersList;
