const BrainJSClassifier = require('natural-brain');

BrainJSClassifier.load('trained_classifier.json', null, null,
  function (err, loadedNet) {
    if (err) {
      return done(err);
    }
    console.log(loadedNet.classify('did the tests pass?'));
  }
);

