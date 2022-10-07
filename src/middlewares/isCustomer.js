const createError = require('http-errors');
const { User } = require('../../db/models');

exports.isCustomer = async (req, res, next) => {
  const user = req.session?.userId
    ? await User.findOne({ raw: true, where: { id: req.session?.userId } })
    : null;

  if (user.role === 'courier') {
    throw createError(403, 'You are not authorized to access this page');
  }

  next();
};
