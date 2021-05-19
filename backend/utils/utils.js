const { BadRequestError } = require('../errors/400-BadRequestError');
const { NotFoundError } = require('../errors/404-NotFoundError');
const { InternalServerError } = require('../errors/500-InternalServerError');

function handleErr(err) {
  if (err.name === 'CastError') {
    throw new BadRequestError('Переданы некорректные данные');
  } else if (err.message === 'NotFound') {
    throw new NotFoundError('Ресурс не найден');
  } else {
    throw new InternalServerError('Произошла ошибка на сервере');
  }
}

module.exports = { handleErr };
