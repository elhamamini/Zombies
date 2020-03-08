const router = require('express').Router();
const { Tag, Conversation } = require('../db');

//return all tags
router.get('/', (req, res, next) => {
    Tag.findAll({
        include: {
            model: Conversation,
            through: {
                attributes: []
            }
        }
    })
        .then(results => {
            res.status(200).send(results);
        })
        .catch(e => {
            res.status(500).send();
            next(e);
        });
});

router.get('/:name', (req, res, next) => {
    Tag.findOne({
        where: {
            name: req.params.name
        },
        include: {
            model: Conversation,
            through: {
                attributes: []
            }
        }
    })
    .then(results => {
        res.status(200).send(results);
    })
    .catch(e => {
        res.status(500).send();
        next(e);
    });
})

module.exports = router;