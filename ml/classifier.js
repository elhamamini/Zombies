const brain = require('brain.js')
const moment = require('moment');
const chalk = require('chalk');

const fs = require('fs');


//TODO: load net in from json, test some inputs
const rawNet = fs.readFileSync('trainedNet.json');
let net = JSON.parse(rawNet);
// const net = new brain.LSTMTimeStep()
// net.fromJSON(json)
// net.run(input)
