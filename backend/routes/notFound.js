const router = require('express').Router();
const { NotFoundError } = require('../errors/404-NotFoundError');

router.use('*', (req, res) => {
  throw new NotFoundError('Данные не найдены');
});

module.exports = router;
