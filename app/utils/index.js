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

export default extractTokens;