const { green, red } = require('chalk');
const {
  db,
  User,
  Reply,
  Conversation,
  Activity,
} = require('./server/db/index');
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
  {
    name: 'Kevin',
    email: 'kevinK@gmail.com',
    password: 'abcde',
    userType: 'user',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    const createdUser = await User.bulkCreate(usersList);
    const userIds = createdUser.map(user => {
      return user.id;
    });
    const conversationsList = [
      {
        id: 1,
        topic: 'mapquest setting up reduce function',
        body: `Trying to set up my reduce for mapQuest, and it's not working how I'm expecting it to. I know I'd need to do something with my new array to get rid ofnew opposite directionsbut I thought the code below shouldat least remoce the redundancies in the first array. From my thinking: reduce is looking at the current value and the previous values, and only if they are not opposites does it add it to the total array. However, I'm getting error messages like the one attached, there is some incrementer thing going on. Would appreciate any guidance!function mapQuest(directions) {function isOpposite(currentValue, previousValue) { let valueArray = [previousValue, currentValue] return valueArray.includes('N' &amp;&amp; 'S') || valueArray.includes('E' &amp;&amp; 'W') }return directions.reduce(function(total, currentValue, previousValue){ ///if the previous value and the current value are not opposites, only///then do we want to add them to the arrayif (isOpposite(currentValue, previousValue)) {return total} else { total.push(previousValue) total.push(currentValue) return total }}, [])}Error message: Expected [ 0, 'N', 1, 'N', 2, 'E', 6, 'E', 8, 'N', 9, 'N', 12, 'E' ] to equal [ 'N', 'N', 'W', 'S', 'E' ].`,
        userId: Math.random(userIds),
      },
    ];
    const createdConversation = await Conversation.bulkCreate(
      conversationsList
    );
    const replyList = [
      {
        body: `Hi Kevin,The MDN docs will steer you right on this one: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceNote the third parameter that gets passed to .reduce()'s callback function. It's always going to be the index of the current item in the array that your reduce function is iterating over. So on the first run-through, it's going to be 0, then 1, then 2, etc.That should get you in the right direction.Now, to get the value of the previous slot in the array, note that the 4th parameter you can pass to reduce's callback will be the source array. So with a call like:arr.reduce( (total, current, index, sourceArr) // sourceArr is the same as arr...you can can reach \"previousValue\" instead using sourceArr[index-1]. Remember to account for edge cases.-Ziv","Ziv's answer was very helpful for understanding how to access the previous element of the array using reduce.Additionally, you are going to have issues with your isOpposite function. When you write valueArray.includes('N' &amp;&amp; 'S'), that isn't saying what you think it is. That will actually first evaluate the expression 'N' &amp;&amp; 'S' which will evaluate to true. Then it will see if valueArray.includes(true), which it won't.In order to properly check if currentValue and previousValue are opposites, you would need to do one of the following:/* Make sure that both 'N' and 'S' exist in valueArray */ let valueArray = [previousValue, currentValue] ['N','S'].every(dir =&gt; valueArray.includes(dir))/****** OR ********/ return (previousValue === 'N' &amp;&amp; currentValue === 'S') ||(previousValue === 'S' &amp;&amp; currentValue === 'N')/****** OR ********/ const opposites = { N: 'S', S: 'N', };return opposites[previousValue] === currentValue;`,
        userId: 1,
        conversationId: 1,
      },
    ];
    await Reply.bulkCreate(replyList);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
