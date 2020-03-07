const BrainJSClassifier = require('natural-brain');
const util = require('util');

// BrainJSClassifier.load('trained_classifier.json', null, null,
//   function (err, loadedNet) {
//     if (err) {
//       return done(err);
//     }
//     console.log(loadedNet.classify('did the tests pass?'));
//   }
// );

const loadNet = util.promisify(BrainJSClassifier.load);

const Classifier = loadNet('trained_classifier.json', null, null)
  .then(loadedNet => {
    return loadedNet
  })
  .catch(e => {
    console.log(e);

  });

module.exports = Classifier

