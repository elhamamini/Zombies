const db = require('./database');
const User = require('./models/user');
const Reply = require('./models/reply');
const Conversation = require('./models/conversation');
const Activity =  require('./models/activity');

//TODO: associations

module.exports = {
  db,
  User,
  Reply,
  Conversation,
  Activity
};
