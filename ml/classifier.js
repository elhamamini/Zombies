const brain = require('brain.js')
const moment = require('moment');
const chalk = require('chalk');

const fs = require('fs');

let rawdata = fs.readFileSync('classifiedSet.json');
let classifiedSet = JSON.parse(rawdata);


const net = new brain.recurrent.LSTM();
testNet.train(classifiedSet, { 
    iterations: 50,
    log: (status) => {
        console.log(status);
    },
})



const jsonNet = net.toJSON();
fs.writeFileSync('trainedNet.json', jsonNet, (e) => {
    if (e) console.log(e)
});