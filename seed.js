const { green, red } = require('chalk');
const {
  db,
  User,
  Reply,
  Conversation,
  Activity,
  Tag,
} = require('./server/db/index');
const whitelist = require('./whitelist');
const { conversationsList, replyList, usersList } = require('./seeding/index');

const seed = async () => {
  try {
    await db.sync({ force: true });
    const createdUser = await User.bulkCreate(usersList);
    const userIds = createdUser.map(user => {
      return user.id;
    });

    const createdTags = await Promise.all(
      Object.keys(whitelist).map(name =>
        Tag.create({
          name,
        })
      )
    );

    const createdConversation = await Conversation.bulkCreate(
      conversationsList
    );

    for (let i = 0; i < createdConversation.length; i++) {
      randomTag = createdTags[Math.round(Math.random() * 100) % createdTags.length];
      await createdConversation[i].addTag(randomTag);
    }

    await Reply.bulkCreate(replyList);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
