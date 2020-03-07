const BrainJSClassifier = require('natural-brain');
const classifier = new BrainJSClassifier();
const moment = require('moment');
const chalk = require('chalk');
const fs = require('fs');

let rawdata = fs.readFileSync('classifiedSet.json');
let cleanResults = JSON.parse(rawdata);

Object.values(cleanResults).forEach(val => classifier.addDocument(val[0], val[1]));

classifier.train();

classifier.save('trained_classifier.json', function () {});