const { green, red } = require('chalk');
const {
  db,
  User,
  Reply,
  Conversation,
  Activity,
  Tag,
  Cohort,
} = require('./server/db/index');
const fullstackDB = require('./fullstackDB');
const whitelist = require('./whitelist');

const { usersList, cohortList } = require('./seeding/index');

const seed = async () => {
  try {
    await db.sync({ force: true });

    const createdCohort = await Cohort.bulkCreate(cohortList);
    const createdUser = await Promise.all(
      usersList.map(user => {
        return User.create({ ...user, cohortId: Math.ceil(Math.random() * 6) });
      })
    );
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
          cohortId: Math.ceil(Math.random() * 6),
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
              isFlagged: Math.random() < 0.5,
            });
          } else {
            Reply.create({
              body: reply,
              userId: Math.ceil(Math.random() * 7),
              conversationId: convObj.id,
              postNumber: i + 1,
              isFlagged: Math.random() < 0.5,
            });
          }
        })
      );
    });

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
