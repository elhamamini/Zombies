const router = require('express').Router();
const { Conversation, Reply, Activity } = require('../db');

const RESULTS_PER_PAGE = 25;

//return a single reply
router.get('/:id', (req, res, next) => {
    Reply.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Activity
        }
    })
    .then(result => {
        result ?
        res.status(200).send(result)
        : res.status(404).send(null);
    })
    .catch(e => {
        res.status(500).send();
        next(e);
    })
});

router.post('/', (req, res, next) => {
    if (!req.body.conversationId) {
        return res.status(400).send('POST reply request missing conversationId');
    }
    Reply.create({
        ...req.body
    })
    .then(created => {
        res.status(200).send(created);
    })
    .catch(e => {
        res.status(500).send();
        next(e);
    })
});

router.put('/:id', (req, res, next) => {
    Reply.update(
        {
            ...req.body
        },
        {
            where: { id: req.params.id },
            returning: true,
        }
    )
    .then(updated => {
        updated ? 
        res.status(201).send(updated[1][0])
        : res.status(404).send(null)
    })
    .catch(e => {
        res.status(500).send();
        next(e);
    })
});

router.delete('/:id', (req, res, next) => {
    Reply.destroy({
        where: {
            id: req.params.id
        },
        include: [
            { model: Activity }
        ],
    })
    .then(destroyed => {
        destroyed ?
        res.status(200).send({success: true})
        : res.status(404).send({success: false})
    })
    .catch(e => {
        res.status(500).send();
        next(e);
    })
});

module.exports = router;