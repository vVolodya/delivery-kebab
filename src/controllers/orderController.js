const createError = require('http-errors');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product, Order } = require('../../db/models');

const OrderCustomer = require('../views/OrderCustomer');

exports.renderYourOrdersPage = async (req, res) => {
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;
  renderTemplate(OrderCustomer, { user }, res);
};

exports.addNewOrder = async (req, res) => {
  const { userid, productid } = req.body;
  await Order.create({
    product_id: productid,
    user_id: userid,
  });
  res.status(200).end()
};
