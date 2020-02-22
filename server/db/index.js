const db = require('./database');
const User = require('./models/user');
const Reply = require('./models/reply');
const Conversation = require('./models/conversation');
const Activity =  require('./models/activity');

//TODO: associations
Reply.belongsTo(Conversation);
Conversation.hasMany(Reply);

User.hasMany(Reply);

Activity.belongsTo(User);
User.hasMany(Activity);

Activity.belongsTo(Reply);

module.exports = {
  db,
  User,
  Reply,
  Conversation,
  Activity
};
