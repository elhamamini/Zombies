const Classifier = require('./loadNet');

// console.log(Classifier.classify('tests ran ok'));
// Classifier.then(net => console.log(net.classify('test string')))

const myFunc = async (string) => {
    const net = await Classifier
    return net;
}
myFunc()