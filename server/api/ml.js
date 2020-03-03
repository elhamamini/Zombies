const router = require('express').Router();
const Sequelize = require('sequelize');
const fs = require('fs');

router.get('/', (req, res, next) => {
    try {
        let rawdata = fs.readFileSync('cleaned.json');
        let cleanResults = JSON.parse(rawdata);
        res.status(200).send(cleanResults);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('error in ml');
    }
});

module.exports = router;
