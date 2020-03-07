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

router.post('/', (req, res, next) => {
    try {
        const { classified } = req.body;
        const classifiedJSON = JSON.stringify(classified);
        fs.writeFileSync('classifiedSet.json', classifiedJSON, (e) => {
            if (e) console.log(e)
        });
        res.status(200).send('success');
    }
    catch (e) {
        console.log(e);
    }
})

router.post('/classify', (req, res, next) => {
    try {
        const { doc } = req.body;

    }
    catch (e) {
        
    }
});

module.exports = router;
