const fs = require('fs');
const BrainJSClassifier = require('natural-brain');
const classifier = new BrainJSClassifier();
const natural = require('natural');
const nlp = require('compromise');

const tokenizer = new natural.WordTokenizer();

const chalk = require('chalk');

const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;
const sentiment = new Analyzer('English', stemmer, 'afinn');

const pruneHTML = (str) => {
    let trimmed = '';
    let htmlTag = true;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '<') {
        htmlTag = true;
      }
      else if (str[i] == '>') {
        htmlTag = false;
      }
      else if (!htmlTag) {
        trimmed += str[i];
      }
    }

    const returnedStr = trimmed.split(`\n`).join(' ').trim();
    return returnedStr;
};

let rawdata = fs.readFileSync('postsByTitle.json');
let rawResults = JSON.parse(rawdata);

let cleanedResults = {};

Object.keys(rawResults).forEach(key => {
    const cleanedSubject = key.split('-').join(' ').trim();
    let trimmedVals = [];
    rawResults[key].forEach(str => {
        trimmedVals.push(pruneHTML(str));
    })
    cleanedResults[cleanedSubject] = trimmedVals;
});

const data = JSON.stringify(cleanedResults);

fs.writeFileSync('cleaned.json', data, (e) => {
  if (e) console.log(e)
  console.log('write success')
});

////---using compromise
// Object.values(cleanedResults).forEach(msg => {
//   const msgTopics = nlp(msg).nouns().json();
//   if (msgTopics.length) {
//     console.log(
//       msgTopics
//     );
//   }
// });

// Object.keys(cleanedResults).forEach(topic => {
//     const tokenTopic = tokenizer.tokenize(topic);
//     const sentimentVal = sentiment.getSentiment(tokenTopic);
//     if (sentimentVal === 0) {
//         console.log(topic);
//     }
//     if (sentimentVal > 0) {
//         console.log(chalk.green(topic));
//     }
//     if (sentimentVal < 0) {
//         console.log(chalk.red(topic));
//     }
// });


