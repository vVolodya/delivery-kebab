require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const session = require('express-session');
const path = require('path');
const FileStore = require('session-file-store')(session);

const PORT = process.env.PORT ?? 7777;
const { SESSION_SECRET } = process.env;

const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/authentication');
const productsRouter = require('./src/routes/products');
const courierRouter = require('./src/routes/courier');
const mapRouter = require('./src/routes/map');
const findAddressRouter = require('./src/routes/findAddress');
const orderRouter = require('./src/routes/orderUser');

const errorHandlers = require('./src/middlewares/errorHandlers');
const connectionCheck = require('./db/connectionCheck');

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

const fileUploadConfig = {
  limits: {
    fileSize: 10000000,
  },
  abortOnLimit: true,
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));
app.use(fileUpload(fileUploadConfig));
app.use(session(sessionConfig));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', courierRouter);
app.use('/product', productsRouter);
app.use('/map', mapRouter);
app.use('/orders', orderRouter);

app.use(errorHandlers.notFound);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

app.listen(PORT, () => {
  connectionCheck();
  console.log(`Express running → PORT ${PORT}`);
});
