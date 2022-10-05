const createError = require('http-errors');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product, Order } = require('../../db/models');

const OrderCustomer = require('../views/OrderCustomer');

exports.renderYourOrdersPage = async (req, res) => {
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;

  const products = await Order.findAll({
    raw: true,
    where: {
      user_id: user.id,
    },
    include: [{ model: Product }],
  });
  renderTemplate(OrderCustomer, { user, products }, res);
};

exports.addNewOrder = async (req, res) => {
  const { userid, productid } = req.body;
  await Product.update({
    isCompleted: true,
  }, {
    where: { id: productid },
    returning: true,
    plain: true,
  });
  await Order.create({
    product_id: productid,
    user_id: userid,
  });
  res.status(200).end();
};
