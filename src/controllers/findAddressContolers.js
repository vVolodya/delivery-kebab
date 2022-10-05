const { User, Product } = require('../../db/models');

exports.findAddress = async (req, res) => {
  console.log('req.session.userId', req.session.userId);
  const idCustomer = req.session.userId;
  const customer = await User.findOne({ where: { id: idCustomer }, raw: true });
  const addressCustomer = customer.address;
  console.log('addressCustomer', addressCustomer);

  const product = await Product.findAll({ raw: true });

  const arrDataProduct = [];
  product.forEach((el) => {
    arrDataProduct.push({ id: el.id, address: el.address });
  });
  console.log(arrDataProduct);

  res.send({ addressCustomer, product: arrDataProduct });
};
