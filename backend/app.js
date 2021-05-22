const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const notFoundRoutes = require('./routes/notFound');

const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'https://api.fmkrom.students.nomoredomains.icu',
  'http://api.fmkrom.students.nomoredomains.icu',
  'https://fmkrom.students.nomoredomains.club',
  'https://fmkrom.students.nomoredomains.club',
  'http://fmkrom.students.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3005',
];

app.use(
  cors({
    origin: true, 
    exposedHeaders: '*',
    credentials: true,
    methods: 'GET, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Origin, Content-Type, Accept',
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);
app.use('*', notFoundRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server launched sucesfully! App listening on port: ${PORT}`);
});

/* Для разрешения запросов со всех доменов:

app.use(
  cors({
   origin: true,
   exposedHeaders: '*'
   credentials: true,
  })
)
*/