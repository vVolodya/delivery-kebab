const { renderTemplate } = require('../middlewares/helpers');

const { User } = require('../../db/models');

const Home = require('../views/Home');

exports.findUserRenderHome = async (req, res) => {
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;
  renderTemplate(Home, { user }, res);
};
