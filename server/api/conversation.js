const router = require('express').Router();
const { Conversation, Reply } = require('../db');
const Sequelize = require('sequelize');

const RESULTS_PER_PAGE = 10;

//get to return all posts
//use query parameter to specify page of results
//TODO: add query parameter support for topic, etc
router.get('/', (req, res, next) => {
  Conversation.findAll({
    limit: RESULTS_PER_PAGE,
    offset: (req.query.page || 0) * RESULTS_PER_PAGE,
    order: [
        ['createdAt', 'DESC']
    ],
  })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

//?color[]=blue&color[]=black&color[]=red
//console.dir(req.query.color)
// => [blue, black, red]

//conversation/filter?tag[]=npm&tag[]=node
router.get('/filter', (req, res, next) => {
  console.log('filter route');
  console.log(req.query.tag);
    Conversation.findAll({
        where: {
            tags: {
                [Sequelize.Op.contains]: [req.query.tag]
            }
        },
        order: [
          ['createdAt', 'DESC']
        ],
    })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
})

//return conversation by Id, includes replies
router.get('/:id', (req, res, next) => {
  Conversation.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Reply,
    },
  })
    .then(result => {
      result ? res.status(200).send(result) : res.status(404).send(null);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

//TODO: Edit Route to handle payload
router.post('/', (req, res, next) => {
  const { author } = req.body
  console.log(typeof author)
  if (!author) {
    return res
      .status(400)
      .send('POST Conversation request missing required field');
  }
  Conversation.create({
    author,
  })
    .then(created => {
      res.status(200).send(created);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
  Conversation.update(
    {
      ...req.body,
    },
    {
      where: { id: req.params.id },
      returning: true,
    }
  )
    .then(updated => {
      updated
        ? res.status(201).send(updated[1][0])
        : res.status(404).send(null);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  Conversation.destroy({
    where: {
      id: req.params.id,
    },
    include: [{ model: Reply }],
  })
    .then(destroyed => {
      destroyed
        ? res.status(200).send({ success: true })
        : res.status(404).send({ success: false });
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

module.exports = router;
