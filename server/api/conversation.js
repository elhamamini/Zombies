const router = require('express').Router();
const Sequelize = require('sequelize');
const { Conversation, Reply, Tag, User, Cohort } = require('../db');

const RESULTS_PER_PAGE = 10;

//get to return all posts
//use query parameter to specify page of results
router.get('/', (req, res, next) => {
  Conversation.findAll({
    include: {
      model: Cohort,
    },
    limit: RESULTS_PER_PAGE,
    offset: (req.query.page || 0) * RESULTS_PER_PAGE,
    order: [['createdAt', 'DESC']],
  })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

//?tag[]=hoisting&tag[]=reduce
router.get('/tags', (req, res, next) => {
  const { tag } = req.query;
  Conversation.findAll({
    include: {
      model: Tag,
      through: {
        attributes: [],
      },
      where: {
        name: {
          [Sequelize.Op.in]: tag,
        },
      },
    },
  })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

//return all conversations with answer
router.get('/answered', (req, res, next) => {
  Conversation.findAll({
    where: {
      hasAnswer: true,
    },
    order: [['createdAt', 'DESC']],
  })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

//return conversation by Id, includes replies
router.get('/:id', (req, res, next) => {
  Conversation.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Reply,
        include: [{ model: User }],
        order: [['createdAt', 'DESC']]
      },
      {
        model: Tag,
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then(result => {
      result ? res.status(200).send(result) : res.status(404).send(null);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.post('/', (req, res, next) => {

  const { userId, title } = req.body;

  if (!userId) {
    return res.status(401).send('Sign in to perform this action');
  }
   
  if (!title) {
    return res.status(400).send('Missing information');
  }

  if(req.headers.authorization !== `Bearer ${userId}`) {
    return res.status(403).send('You do not have permission to perform this action. Contact administrator.')
  }

  Conversation.create({
    userId,
    title,
  })
    .then(created => {
      if (req.body.tags.length) {
        created.addTag(req.body.tags[0].id)
        .then(() => res.status(200).send(created));
      } else {
      res.status(200).send(created);
      }
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.put('/:id', (req, res, next) => {

  if(req.headers.authorization !== `Bearer admin` && req.headers.authorization !== `Bearer user`) {
    res.status(403).send('You do not have permission to perform this request. Contact administrator.')
  }

  Conversation.update(
    { ...req.body },
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

  if(req.headers.authorization !== `Bearer admin`) {
    res.status(403).send('You do not have permission to perform this request. Contact administrator.')
  }

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
