const createError = require('http-errors');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product } = require('../../db/models');

const Order = require('../views/Order');

exports.getOrderInfo = async (req, res) => {
  const { id } = req.params;
  req.session.productID = id;
  const { distanceData } = req.session;

  if (req.session.distanceData) {
    renderTemplate(Order, { distanceData }, res);
  } else {
    renderTemplate(Order, { }, res);
  }
};
