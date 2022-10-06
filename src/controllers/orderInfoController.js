const createError = require('http-errors');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product } = require('../../db/models');

const Order = require('../views/Order');

exports.getOrderInfo = async (req, res) => {
  const user = req.session.userId
    ? await User.findOne({ where: { id: req.session.userId } })
    : null;

  const { id } = req.params;
  req.session.productID = id;

  const product = await Product.findOne({
    raw: true,
    where: { id },
    include: [{ model: User }],
  });

  const { distanceData } = req.session;

  if (req.session.distanceData) {
    renderTemplate(Order, {
      user, product, distanceData,
    }, res);
  } else {
    renderTemplate(Order, { user, product }, res);
  }
};
