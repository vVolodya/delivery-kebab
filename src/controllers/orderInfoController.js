const createError = require('http-errors');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product } = require('../../db/models');

const OrderInfo = require('../views/Order');

exports.getOrderInfo = async (req, res) => {
  res.send('Nice!');
};
