const { green, red } = require('chalk');
const {
  db,
  User,
  Reply,
  Conversation,
  Activity,
} = require('./server/db/index');
const { conversationsList, replyList, usersList } = require('./seeding/index');

const seed = async () => {
  try {
    await db.sync({ force: true });
    const createdUser = await User.bulkCreate(usersList);
    const userIds = createdUser.map(user => {
      return user.id;
    });

    const createdConversation = await Conversation.bulkCreate(
      conversationsList
    );

    await Reply.bulkCreate(replyList);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
