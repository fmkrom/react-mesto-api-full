const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/401-UnauthorizedError');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(`Пользователю необходима авторизация: ${req.headers}. Результат: ${res}`);
  }
  const token = authorization.replace('Bearer ', '');

  if (!token) { throw new UnauthorizedError('Необходима авторизация: отсутствует токен'); }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Передан некорректный токен');
  }
  req.user = payload;

  next();
}

module.exports = { auth };
