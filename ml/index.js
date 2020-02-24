const fs = require('fs');
const nlp = require('compromise');
const chalk = require('chalk');

//helper to prune html tags out of text
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

//takes the raw posts scraped from Learndot Discuss
//cuts out the html and writes as a json object
//format is [post title]: [reply, reply, reply...]
const processRaw = () => {
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
  });

  return cleanedResults;
}

//tokenizes and pulls tags out of the cleaned posts
//returns an object of [tag]: [number of occurrences]
//only returns tags with multiple occurrences across all posts
const getTags = () => {
  let rawdata = fs.readFileSync('cleaned.json');
  let cleanResults = JSON.parse(rawdata);

  let tagsCount = {};
  let topTags = {};
  Object.keys(cleanResults).forEach(key => {
    const firstPost = cleanResults[key][0];
    if (firstPost.length > 1) {
      let postTopics = '';
      //compromise is a bit buggy with normalize(), so this is in a try loop
      try {
        let postTopics = nlp(firstPost).normalize({
          plurals:true,
          parentheses:true,
          possessives:true,
        }).nouns();

        postTopics.out('freq').forEach(term => {
          tagsCount[`${term.reduced}`] = tagsCount[`${term.reduced}`] ? tagsCount[`${term.reduced}`] + term.count : term.count;
        });
      }
      catch (e) {
        console.log('error');
      }
    }
  });

  Object.keys(tagsCount).forEach(key => {
    if (tagsCount[key] > 2 && String(key).length > 1) {
      topTags[key] = tagsCount[key];
    }
  });
  return topTags;
}

//generates a whitelisted json object for the frontend from the text file, which is manually curated
const generateWhitelist = () => {
  const whitelisted = {};
  const data = fs.readFileSync('whitelist.txt', 'UTF-8');
  const lines = data.split(/\r?\n/);
  lines.forEach((line, idx) => {
    whitelisted[line] = idx + 1;
  });
  const whitelistedJSON = JSON.stringify(whitelisted);
  fs.writeFileSync('whitelist.json', whitelistedJSON, (e) => {
    if (e) console.log(e)
  });
  return whitelisted;
}


