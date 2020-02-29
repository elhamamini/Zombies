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
        return Conversation.create({
          title: title,
          userId: Math.ceil(Math.random() * 7),
        });
      })
    );

    console.log('cc', createdConversation);
    const replies = await createdConversation.map(convObj => {
      return Promise.all(
        fullstackDB[convObj.title].map((reply, i) => {
          console.log('reppy', reply);
          console.log('convObj', convObj);
          console.log('convObj', convObj.title);
          if (i === 0) {
            Reply.create({
              body: reply,
              userId: convObj.userId,
              conversationId: convObj.id,
            });
          } else {
            Reply.create({
              body: reply,
              userId: Math.ceil(Math.random() * 7),
              conversationId: convObj.id,
            });
          }
        })
      );
    });

    // const createdConversation = await Conversation.bulkCreate(
    //   conversationsList
    // );

    for (let i = 0; i < createdConversation.length; i++) {
      console.log('here');
      randomTag =
        createdTags[Math.round(Math.random() * 100) % createdTags.length];
      await createdConversation[i].addTag(randomTag);
    }

    // await Reply.bulkCreate(replyList);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
