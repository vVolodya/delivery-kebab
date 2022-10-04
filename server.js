require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const ordersRouter = require('./src/routes/orders');
const authenticationRouter = require('./src/routes/authentication');
const { renderTemplate } = require('./src/middlewares/helpers');
const Home = require('./src/views/Home');
const { User } = require('./db/models');

const PORT = process.env.PORT ?? 7777;
const { SESSION_SECRET } = process.env;

const app = express();

const sessionConfig = {
  name: 'kebab',
  store: new FileStore(),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(fileUpload({
  limits: {
    fileSize: 10000000,
  },
  abortOnLimit: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));
app.use(session(sessionConfig));

app.use('/', authenticationRouter);
app.use('/new-order', ordersRouter);

app.get('/', async (req, res) => {
  // Достаем из сессии нашего пользователя, если он есть
  // user is either NULL or UNDEFINED or the userName of the currently signed in user
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;
  renderTemplate(Home, { user }, res);
});

app.listen(PORT, () => console.log(`Express running → PORT ${PORT}`));
