const createError = require('http-errors');
const { Product } = require('../../db/models');

exports.isOrdered = async (req, res, next) => {
  const { id } = req.params;

  const { isCompleted } = await Product.findOne({
    raw: true,
    where: { id },
    attributes: ['isCompleted'],
  });

  if (isCompleted) {
    throw createError(400, 'Bad Request');
  }

  next();
};
