require('dotenv').config();
const express = require('express');

const fileUpload = require('express-fileupload');
const path = require('path');
const logger = require('morgan');

const PORT = process.env.PORT ?? 7777;

const ordersRouter = require('./src/routes/orders');

const app = express();

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

app.use('/new-order', ordersRouter);

app.listen(PORT, () => console.log(`Express running → PORT ${PORT}`));
