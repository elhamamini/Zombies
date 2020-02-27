const conversationsList = [
  {
    id: 1,
    title: 'mapquest setting up reduce function',
    body: `Trying to set up my reduce for mapQuest, and it's not working how I'm expecting it to. I know I'd need to do something with my new array to get rid ofnew opposite directionsbut I thought the code below shouldat least remoce the redundancies in the first array. From my thinking: reduce is looking at the current value and the previous values, and only if they are not opposites does it add it to the total array. However, I'm getting error messages like the one attached, there is some incrementer thing going on. Would appreciate any guidance!function mapQuest(directions) {function isOpposite(currentValue, previousValue) { let valueArray = [previousValue, currentValue] return valueArray.includes('N' &amp;&amp; 'S') || valueArray.includes('E' &amp;&amp; 'W') }return directions.reduce(function(total, currentValue, previousValue){ ///if the previous value and the current value are not opposites, only///then do we want to add them to the arrayif (isOpposite(currentValue, previousValue)) {return total} else { total.push(previousValue) total.push(currentValue) return total }}, [])}Error message: Expected [ 0, 'N', 1, 'N', 2, 'E', 6, 'E', 8, 'N', 9, 'N', 12, 'E' ] to equal [ 'N', 'N', 'W', 'S', 'E' ].`,
    userId: 4,
    tags: ['reduce'],
  },
  {
    id: 2,
    title: 'using apply with null as an argument',
    body:
      "I'm looking through the documentation regarding the use of .apply(). After reading MDN, I still have some confusion about the appropriate use of null as an argument.The solution code for complement function that reads:function complement(func) {return function ( ) { return !func.apply(null, arguments) }}",
    userId: 5,
    tags: ['documentation'],
    hasAnswer: true,
  },
  {
    id: 3,
    title: 'question about multiple maps solution spoilers',
    body:
      "struggled with multiple maps for a long time. After looking at the solution, one of the things that was tripping me up was that I was first looping through the array of objects, then doing my for of loop. The solution below has you go right into the for of loop on the second array after you map over the first array. Can someone walk me through what's going on here? It seems to me that they wouldn't be ale to look at the individual objects in the array without first isolating those objects. Basically, it seems to me like we're doing a for of loop over an array, and it shouldn't be able to get at the values we need yet. Solution: function multipleMaps(input, maps) {return input.map(function(key){for (let map of maps) {if(key in map) {return map[key]}}return key})}",
    userId: 4,
    tags: ['map', 'array'],
  },
  {
    id: 4,
    title: 'function expressions hoisting best practices',
    body:
      "A quick question about best practices moving forward with es6 syntax - especially when we start creating apps and sites.Let's say we are making an app and we have 3 functions. The functions call to each other and cascade downwards:function getRandomUser() {addData()}function addData(){updateDOM()}function updateDOM(){}In this case we get data on the user, send the user data to the addData function to store it, and then transmit data to appear on the DOM via the updateDOM function.However, using es6 syntax it would flow in the opposite direction because we can't call function expressions before they are defined as they are not hoisted.const updateDOM = () =&gt; {}const addUser = () =&gt; {updateDOM()}const getRandomUser = () =&gt; {addData()}Is this a matter of preference? Is there certain use cases for one over the other? Is it generally best practice to use functions expressions over declarations? If anyone has any input I'd be curious to hear!",
    userId: 6,
    tags: ['hoisting', 'function'],
  },
  {
    id: 5,
    title: 'running testem and receiving failures',
    body:
      'Hey guys, I have been running testem and receiving failures with testem saying my answers are returning undefined, however when I open the console the correct answers to each question are loaded. This continues to happen even when I refresh the page. Just wondering if anyone has experienced this and if I should be worried that there is something wrong with my code execution, or if this is just a jasmine/testem site error?',
    userId: 5,
    tags: ['testem']
  },
  {
    id: 6,
    title: 'foundations part 3 call site execution context',
    body:
      "I'm a little confused about the meaning of the first sentence here.\"When you invoke or call a function, the function creates its own. The execution context is a record of information of code executing such as where it's called (where the code is on the call stack), how the function was invoked, its Scope Chain, the value of this, and more!\"Is it suggesting that it's creating it's own execution context? Or does \"creates its own\" refer to something else that I'm not understanding.",
    userId: 5,
    tags: ['function'],
  },
  {
    id: 7,
    title: 'expected return value of an expression',
    body:
      'In Foundations Part 3 re \'this\', there was a code example that returned an expression. From what MDN says, the return statement ends function execution and specifies a value to be returned to the function caller. How is this method/function able to return an expression (this.power = \'on\') instead of a value? Thanks!Code belowconst tvRemote = {on: function() {return this.power = "on";},off: function() {return this.power = "off";},power: "off"};tvRemote.on.call({power:"off", size:"60-inch"});',
    userId: 7,
    tags: ['function'],
  },
  {
    id: 8,
    title: 'quite study room needed',
    body:
      'Quite study room neededI am an upcoming student for the Fullstack immersive software engineering program. My cohort starts at Jan 13. I wonder if I can use the campus as a study room after Junior Phrase ends before Senior Phase starts, or even after Senior Phase ends while I am job searching. I need a quite place to study but unfortunately there is construction going on outside my apartment. Also if there is any recommendations of quite study place I would appreciate it a whole lot. I am willing to pay for the place.',
    userId: 5,
    tags: ['study'],
  },
  {
    id: 9,
    title: 'testfirst review error in fiilter test specs',
    body:
      "Sorry if someone's already brought this up, but just in case anyone was having trouble with the TestFirst review specs—specifically failing the .forEach() call-through spec on the 'fiilter' problem—I think there's a mistake on line 37 of the test specs: it's checking that the .forEach() method was called, but then calls the 'filter' method on an array instead of the 'fiilter' method, so the spec will fail even if you've written your code correctly. Just thought I'd point this out so that no one else puzzles over the spec for too long like I did.",
    userId: 2,
    tags: ['test spec', 'error'],
  },
  {
    id: 10,
    title: 'confusion with hoisting',
    body:
      "Screen Shot 2019-12-19 at 2.00.27 PM.png1073x231 38.1 KB Can anyone explain to me which this would return undefined?I understand the basics of hoisting like how declarations are hoisted but not the assignments and how function declarations are hoisted in its entirety. But I don't know exactly how to break apart this code with all the weird parentheses.",
    userId: 8,
    tags: ['hoisting', 'error'],
  },
  {
    id: 11,
    title: 'tostring call val vs val tostring',
    body: `"I need help understanding the difference between calling toString.call(val) vs val.toString(): toString.call(null) -- I get [object Null]null.toString();-- I get error \"Uncaught TypeError: Cannot read property 'toString' of null\"toString.call([12,3])-- I get [object Array]-- I get \"12,3\"`,
    userId: 6,
  },
];
module.exports = conversationsList;
