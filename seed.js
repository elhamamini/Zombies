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
const { usersList } = require('./seeding/index');
const fullstackDB = require('./fullstackDB');
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
    const titles = Object.keys(fullstackDB);

    const createdConversation = await Promise.all(
      titles.map(title => {
        let answer = false;
        if (fullstackDB[title].length > 1) {
          answer = true;
        }
        return Conversation.create({
          title: title,
          userId: Math.ceil(Math.random() * 7),
          hasAnswer: answer,
          views: Math.ceil(Math.random() * 100),
        });
      })
    );
    const replies = await createdConversation.map(convObj => {
      return Promise.all(
        fullstackDB[convObj.title].map((reply, i) => {
          if (i === 0) {
            Reply.create({
              body: reply,
              userId: convObj.userId,
              conversationId: convObj.id,
              postNumber: i + 1,
            });
          } else {
            Reply.create({
              body: reply,
              userId: Math.ceil(Math.random() * 7),
              conversationId: convObj.id,
              postNumber: i + 1,
            });
          }
        })
      );
    });

    // const createdConversation = await Conversation.bulkCreate(
    //   conversationsList
    // );

    for (let i = 0; i < createdConversation.length; i++) {
      randomTag =
        createdTags[Math.round(Math.random() * 100) % createdTags.length];
      await createdConversation[i].addTag(randomTag);
    }
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
