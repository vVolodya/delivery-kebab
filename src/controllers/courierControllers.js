const createError = require('http-errors');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product } = require('../../db/models');

const CourierProfile = require('../views/CourierProfile');

exports.renderProfile = async (req, res) => {
  const user = req.session.userId
    ? await User.findOne({ where: { id: req.session.userId } })
    : null;

  if (!user || user.role === 'customer') {
    return res.redirect('/');
  }

  const products = await Product.findAll({
    raw: true,
    where: {
      courier_id: user.id,
    },
    order: [['id', 'DESC']],
  });

  renderTemplate(CourierProfile, { user, products }, res);
};
