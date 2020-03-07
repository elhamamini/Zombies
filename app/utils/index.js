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

const pruneHTML = str => {
  let trimmed = '';
  let htmlTag = true;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '<') {
      htmlTag = true;
    } else if (str[i] == '>') {
      htmlTag = false;
    } else if (!htmlTag) {
      trimmed += str[i];
    }
  }

  const returnedStr = trimmed
    .split(`\n`)
    .join(' ')
    .trim();
  return returnedStr;
};

const convertToGlyphs = str => {
  return str
    ? str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
    : '';
};

const createURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const cssURL = getBlobURL(css, 'text/css');
  const jsURL = getBlobURL(js, 'text/javascript');

  const source = `
    <html>
      <head>
        ${css && `<link rel='stylesheet' type='text/css' href='${cssURL}' />`}
      </head>
      <body>
        ${html || ''}
        ${js && `<script src='${jsURL}'></script>`}
      </body>
    </html>
  `;

  return getBlobURL(source, 'text/html');
};

export {
  pruneHTML,
  extractTokens,
  convertToGlyphs,
  createURL,
  // extractConsoleLogs,
  // overrideConsoleLog,
};
