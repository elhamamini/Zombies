import nlp from 'compromise';

export const formHighlight = (txt) => {
    const nounsList = [];
    //go through list of nouns and count occurrences
    nlp(txt).toLowerCase().nouns().toSingular().json().forEach(term => {
        nounsList[term] = nounsList[term] ? nounsList[term]++ : 1;
    });
    console.log(nlp(txt).toLowerCase().nouns().toSingular().json());
}