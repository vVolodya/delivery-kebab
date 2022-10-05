const createError = require('http-errors');
const { renderTemplate } = require('./helpers');
const Error = require('../views/Error');
const { User } = require('../../db/models');

exports.catchErrors = (fn) => function (req, res, next) {
  return fn(req, res, next).catch(next);
};

exports.notFound = (req, res, next) => {
  const err = createError(404, 'Not found');
  next(err);
};

exports.developmentErrors = async (err, req, res, next) => {
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;

  const error = err;

  const errorDetails = {
    message: error.message,
    status: error.status,
    stackHighlited: error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  };

  res.status(error.status || 500);

  res.format({
    'text/html': () => renderTemplate(Error, { errorDetails, user }, res),
    'application/json': () => res.json(errorDetails),
  });
};

exports.productionErrors = async (err, req, res, next) => {
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;

  const error = err;

  res.status(error.status || 500);

  const errorDetails = {
    message: error.message,
    status: error.status,
  };

  renderTemplate(Error, { errorDetails, user }, res);
};
