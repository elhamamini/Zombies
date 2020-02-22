const router = require('express').Router();
const conversationRouter = require('./conversation');

router.use('/conversation', conversationRouter);

router.use('*', (req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
