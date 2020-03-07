const replyList = [
  {
    body: `Hi Kevin,The MDN docs will steer you right on this one: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceNote the third parameter that gets passed to .reduce()'s callback function. It's always going to be the index of the current item in the array that your reduce function is iterating over. So on the first run-through, it's going to be 0, then 1, then 2, etc.That should get you in the right direction.Now, to get the value of the previous slot in the array, note that the 4th parameter you can pass to reduce's callback will be the source array. So with a call like:arr.reduce( (total, current, index, sourceArr) // sourceArr is the same as arr...you can can reach \"previousValue\" instead using sourceArr[index-1]. Remember to account for edge cases.-Ziv","Ziv's answer was very helpful for understanding how to access the previous element of the array using reduce.Additionally, you are going to have issues with your isOpposite function. When you write valueArray.includes('N' &amp;&amp; 'S'), that isn't saying what you think it is. That will actually first evaluate the expression 'N' &amp;&amp; 'S' which will evaluate to true. Then it will see if valueArray.includes(true), which it won't.In order to properly check if currentValue and previousValue are opposites, you would need to do one of the following:/* Make sure that both 'N' and 'S' exist in valueArray */ let valueArray = [previousValue, currentValue] ['N','S'].every(dir =&gt; valueArray.includes(dir))/****** OR ********/ return (previousValue === 'N' &amp;&amp; currentValue === 'S') ||(previousValue === 'S' &amp;&amp; currentValue === 'N')/****** OR ********/ const opposites = { N: 'S', S: 'N', };return opposites[previousValue] === currentValue;`,
    userId: 1,
    conversationId: 1,
  },
  {
    body:
      "Hey Sara, that's a really good question.The real use case for .call() and .apply() is to modify the context (this) of a function when it's called and to pass arguments to the function. So, for instance:function logInfo(age, height) { console.log(`Name: ${this.name}, Age: ${age}, Height: ${height}`); }logInfo.call({ name: 'Jimmy' }, 74, 60); // Will log 'Name: Jimmy, Age: 74, Height: 60' logInfo.call({ name: 'Jenny' }, 50, 69); // Will log 'Name: Jenny, Age: 50, Height: 69'logInfo.apply({ name: 'Jimmy' }, [74, 60]); // Will log 'Name: Jimmy, Age: 74, Height: 60' logInfo.apply({ name: 'Jenny' }, [50, 69]); // Will log 'Name: Jenny, Age: 50, Height: 69'As you can see, both .call() and .apply() can be used for the same purposes. They both set the context (this) of the function and offer a way to pass additional arguments. The only difference between the two is how additional arguments are passed. With .call(), they are passed as normal arguments, with .apply(), they are passed as an array.In this next example, it doesn't matter what we pass as the this argument to .call() or .apply() because the function doesn't ever reference a this.function logInfo(age, height) { console.log(`Age: ${age}, Height: ${height}`); }logInfo.call({ name: 'Jimmy' }, 74, 60); // Will log 'Age: 74, Height: 60' logInfo.apply(null, [74, 60]); // Will log 'Age: 74, Height: 60'So, to finally get around to answering your question...The function returned from complement just needs a simple way to pass all of its arguments along to func. It does that by hijacking the functionality of .apply(). .apply() is perfect for this scenario because, unlike .call(), it can pass an unlimited number of arguments to the function in a single array (the arguments object). And the reason it passes null as the context (this) is because the func doesn't care what its context (this) is. If the func doesn't ever reference this, then it doesn't matter what is passed at the first argument to .apply(). You could have passed anything there and it wouldn't have made a difference.",
    userId: 2,
    conversationId: 2,
  },
  {
    body:
      "To start with, let's use the examples given in the problem to assert that maps is expecting an array of objects, such as [ { a: 0 }, { b: 1, c: 2 }, { d: 3 } ]and inputs is an array of the properties we want to extract from those objects. input will be an array representing keys/properties we want to pull from those objects in map. To think about the solution, I want to clarify that it’s not that you loop the maps array after you map over the first array, it’s while..map() will, in this case, iterate over every item of input, and pass the current item to the callback function declared inside its argument list. In this case, the callback is the anonymous function that begins after .map( and ends on the second-to-last line, and the current item is referenced inside that callback with key. The for…of is inside the callback function, so it'll be run on every item inside the input array. Remember that these items are all going to be the properties we reference in the objects stored in maps. The loop then runs through each object in maps (e.g., { a: 0} in my example above) and, ifkey` is the name of a property in that object, it returns the value associated with that property. Otherwise, it simply returns the property.Sorry, that was a lot, but I hope it explains what's going on. Let me know if you have any further questions.",
    userId: 5,
    conversationId: 3,
  },
  {
    body:
      "Below is my solution and it passed. One of the things that is confusing me about the TestFirst solution is that the key is being matched but it's not accounting for the fact that there are different types (string and number) in the different test cases. In my solution I needed to turn the value being mapped into a string to account for that and then match it to each property in the object.const multipleMaps = (arr, maps) =&gt; { return arr.map(val =&gt; { for (let item of maps) { for (let prop in item) { if (val.toString() === prop) { return item[prop]; } } } });};",
    userId: 2,
    conversationId: 3,
  },
  {
    body:
      'This can really be a matter of preference.The important part is that you understand the differences between the two, in case they are the source of a bug.Some companies will have a style guide that leans more towards function expressions vs declarations, or vice versa.',
    userId: 4,
    conversationId: 4,
  },
  {
    body:
      'Nevermind, I realized I was returning my answers with console.log(), which testem does not accept, rather than using return. Once I made the switch it worked and all my answers passed.',
    userId: 5,
    conversationId: 5,
  },
  {
    body:
      'Hi Sara,You are correct with your first assertion: when a function is called, its own execution context is created. This context records various details about the function, as outlined in the rest of the explanation you cited above. Hope that clarifies things.-Ziv',
    userId: 1,
    conversationId: 6,
  },
  {
    body:
      'Hi Tiffany,Good question! This one trips me up from time to time, too. Note that a single equals sign (=) is an assignment operator, not a comparison operator. So what\'s happening at the end of the .on() method is that we are assigning the value "on" to this.power, and then we are returning that new value of this.power: "on".Point of interest: if we were looking at this.power === \'on\', this would still be OK. That expression would evaluate to either a true or false value depending on the current value of this.power, and then the return statement would return that value.Hope that clarifies things!-Ziv',
    userId: 4,
    conversationId: 7,
  },
  {
    body:
      '"I don’t know about Fullstack, but I know the NYPL at 53st next to the MOMA is a nice place to study and it is free.Just be aware of the open time."',
    userId: 7,
    conversationId: 8,
  },
  {
    body:
      'Thanks! I saw that it opens at 11, but I would rather go earlier like 9 am. I can find other NYPL which opens earlier. Anyone who is interested in finding a study mate to go to libraries together?',
    userId: 5,
    conversationId: 8,
  },
  {
    body:
      "I'm also in the cohort starting Jan 13th. I thought campus is open between phases but maybe someonecan confirm this?Both the upper west side NYPL on 81st and Amsterdam and the Bryant Park NYPL open at 10AM. Rose Reading room at Bryant Park NYPL is super quiet. I'm not sure if any of the libraries open at 9AM.The Atrium at Lincoln Center is pretty quiet and open around 8AM and has bathrooms and free wifi. I think there's a private library on the upper east side as well for a fee...the New York Society Library maybe?",
    userId: 3,
    conversationId: 8,
  },
  {
    body:
      'Thanks a lot! I will use Bryant park NYPL as my main study room then, thanks a lot!',
    userId: 5,
    conversationId: 8,
  },
  {
    body:
      'I don’t know about the availability of the campus after each phases. But I am totallyup to group study in NYPL, help me stay disciplined!',
    userId: 3,
    conversationId: 8,
  },
  {
    body:
      "Hello, I'm in the same cohort as well. I'd love to join a study group. I'm sure we can find a suitable location, if not on campus. Let's link up after the course begins next week and talk more about times and location. Looking forward to it!",
    userId: 4,
    conversationId: 8,
  },
  {
    body: "Hi,I'm down for a study group also.See you guys next week.",
    userId: 1,
    conversationId: 8,
  },
  {
    body:
      "I checked out the Rose Room at the Bryant Park NYPL today. It opens at 10AM and it is a massive room...for quiet whispered study.However, there's a room across the hall that's great for groups and collaboration. Plenty of tables, bathrooms, wifi, and some electrical outlets. There's a side entrance to the library that opens either at 8 or 9 and there are some small pockets of rooms with tables. I'm up for group study also, whether it's here or somewhere else more central to wherever everyone else is.See you all next week!",
    userId: 5,
    conversationId: 8,
  },
  {
    body:
      'no, there are no errors in specs. They asked you to use forEach method and check for condition to filter some values instead of filter method',
    userId: 6,
    conversationId: 9,
  },
  {
    body:
      'no, there are no errors in specs. They asked you to use forEach method and check for condition to filter some values instead of filter method',
    userId: 5,
    conversationId: 9,
  },
  {
    body:
      "You're totally right! It calls .filter instead of .fiilter. Nice catch! There was also an error in the .maap specs that @Tyler_Eaden caught.",
    userId: 6,
    conversationId: 9,
  },
  {
    body:
      '@Ari_Korotkin thanks for the heads up! Here is a link to the version I updated yesterday, it should already have a fix for this and any other specs in the exercise.As @Katt_Baum mentioned, @Tyler_Eaden found a few of the errors the other day, here is a link to the post so you can review them in case your version of the exercise has more (I suggest copy and pasting the new test specs from the link I provided). Sorry for the trouble!',
    userId: 3,
    conversationId: 3,
  },
  {
    body:
      "Hi Jason.Nice question - is this example from MDN?I can comment that the parens surrounding the function allow for the IFFEto work without an error being thrown. You probably have this following part down but I'll leave this here anyway.I'm thinking the function (including its code block) is hoisted as expected.Then within the function's execution context, the 'var x' declaration (but NOT x's assignment) is hoisted.That's why you get 'undefined' as the value that is being console.logged. If you comment out var x = 'inner scope' you will see that x becomes 'outer scope' which just shows that the function is looking within its own context first before moving up the so called scope chain.",
    userId: 7,
    conversationId: 10,
  },
  {
    body:
      "The main trick here is using var. All var variables are doing hoisting. So it means that you second var inside this function is hoisting too. So what happens here is something like that:var x; x = 'outer scope'; var x; ... your functionSo by using var second time even inside your function you re-assigned it to undefined",
    userId: 4,
    conversationId: 10,
  },
  {
    body:
      "Thanks for the explanations, everyone. I never learned what IFFE was so I didn't even understand the code, but messing around with taking out the var x inside the function now, I understand how it works better now.Also, I found that example in http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified Said that if I didn't know it was gonna be undefined I couldn't keep reading so I freaked",
    userId: 8,
    conversationId: 10,
  },
  {
    body:
      "The difference between these two lies in the fact that each type of thing (Array, number, object) will implement its own custom version of toString. So, Array.prototype.toString() will join the array elements with a comma. But the Object toString will just spit out [object Object].By doing toString.call(val), you are using a function that works like the Object.toString() function, meaning that it will spit out something like [object Array] when you call it with an array. By doing arr.toString(), you are using Array.prototype.toString() which is custom designed to handle arrays which is why you get a better output.The reason that you are getting the error with null.toString is because null doesn't have any properties or prototype chain on it, so you can't call methods or access properties off of null.This is a lot of info, so if any of this is confusing, just let me know.",
    userId: 3,
    conversationId: 11,
  },
];

module.exports = replyList;
