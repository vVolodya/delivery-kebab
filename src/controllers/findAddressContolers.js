const { User } = require('../../db/models');

exports.findAddress = async (req, res) => {
  console.log('req.session.userId', req.session.userId);
  const idCustomer = req.session.userId;
  const customer = await User.findOne({ where: { id: idCustomer }, raw: true });
  const addressCustomer = customer.address;
  console.log('addressCustomer', addressCustomer);

  res.send({ addressCustomer });
};
