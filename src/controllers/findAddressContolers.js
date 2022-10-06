const { User, Product } = require('../../db/models');

exports.findAddress = async (req, res) => {
  const idCustomer = req.session.userId;
  const { productID } = req.session;

  const product = await Product.findOne({ where: { id: productID }, raw: true });
  const customer = await User.findOne({ where: { id: idCustomer }, raw: true });

  const customerAddress = customer.address;
  const productAddress = product.address;

  res.json({ customerAddress, productAddress });
};
