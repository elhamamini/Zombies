import nlp from 'compromise';

const extractTokens = (body, whitelist) => {
    const tokens = [];
    //run compromise on body content
    let postTopics = nlp(body)
        .trim()
        .normalize({ plurals: true, parentheses: true })
        .nouns();
    //loop through returned terms
    postTopics.out('freq').forEach(term => {
        //if term is NOT already in the tags list and IS in the whitelist, add it
        if (whitelist[term.reduced] && !tokens.includes(term.reduced)) {
            tokens.push(term.reduced);
        }
    });
    return tokens;
};

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

const convertSymbols = str => {
  return str
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '\"')
}

const overrideConsoleLog = () => {
  if(!console) {
    console = {};
  };
  const originalConsoleLog = console.log;
  let result = '';
  console.log = str => {
    if(typeof str === undefined) {
      result += 'undefined';
    } else if(typeof str === 'object' &&
      typeof JSON === 'object &&' &&
      typeof JSON.stringify === 'function') {
        result += JSON.stringify(str);
      } else {
        result += arg;
      }
      result += '<br />'
  }
  
  console.log = originalConsoleLog;
}

export {
    pruneHTML,
    extractTokens,
    convertSymbols,
};