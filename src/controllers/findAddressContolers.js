const { User, Product } = require('../../db/models');


exports.findAddress = async (req, res) => {
  const idCustomer = req.session.userId;

  const customer = await User.findOne({ where: { id: idCustomer }, raw: true });
  const addressCustomer = customer.address;

  const product = await Product.findAll({ raw: true });

  const arrDataProduct = [];
  product.forEach((el) => {
    arrDataProduct.push({ id: el.id, address: el.address });
  });

  res.json({ addressCustomer, product: arrDataProduct });
};
