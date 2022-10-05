const createError = require('http-errors');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product } = require('../../db/models');

const CourierProfile = require('../views/CourierProfile');

exports.renderProfile = async (req, res) => {
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;

  const products = await Product.findAll({
    raw: true,
    where: {
      courier_id: user.id,
    },
  });

  renderTemplate(CourierProfile, { user, products }, res);
};
