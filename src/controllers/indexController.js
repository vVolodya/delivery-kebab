const { renderTemplate } = require('../middlewares/helpers');

const { User, Product } = require('../../db/models');

const Home = require('../views/Home');

exports.findUserRenderHome = async (req, res) => {
  req.session.distanceData = null;

  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;

  const products = await Product.findAll({
    where: {
      isCompleted: false,
    },
    raw: true,
    include: [{ model: User }],
  });

  renderTemplate(Home, { user, products }, res);
};
