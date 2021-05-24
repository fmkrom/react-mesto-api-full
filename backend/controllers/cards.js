const Card = require('../models/card');
const { handleErr } = require('../utils/utils');

const { BadRequestError } = require('../errors/400-BadRequestError');
const { NotFoundError } = require('../errors/404-NotFoundError');
const { InternalServerError } = require('../errors/500-InternalServerError');
const { ForbiddenError } = require('../errors/403-ForbiddenError');

function getCards(req, res, next) {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      throw new InternalServerError(`Ошибка на сервере: ${err}`);
    })
    .catch(next);
}

function createCard(req, res, next) {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
    likes: [],
    createdAt: Date.now(),
  })
    .then((card) => { res.send({ card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные для создания карточки');
      } else {
        throw new InternalServerError('Ошибка на сервере');
      }
    })
    .catch(next);
}
function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((foundCard) => {
      const cardIsOwn = Boolean(foundCard.owner == req.user._id);

      if (!cardIsOwn) {
        throw new ForbiddenError('У пользователя нет прав на удаление карточки');
      } else if (cardIsOwn) {
        Card.findByIdAndRemove(foundCard._id)
          .then((deletedCard) => res.send({ deletedCard }));
      }
    }).catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.name === 'TypeError') {
        throw new NotFoundError('Карточка не найдена');
      }
      next(err);
    })
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFound'))
    .then((likedCard) => res.send(likedCard))
    .catch((err) => handleErr(err))
    .catch(next);
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFound'))
    .then((dislikedCard) => res.send(dislikedCard))
    .catch((err) => handleErr(err))
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
