const createError = require('http-errors');
const nodemailer = require('nodemailer');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product, Order } = require('../../db/models');

const OrderCustomer = require('../views/OrderCustomer');

exports.renderYourOrdersPage = async (req, res) => {
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;

  if (!user || user.role === 'courier') {
    return res.redirect('/');
  }

  const orders = await Order.findAll({
    raw: true,
    where: {
      user_id: user.id,
    },
    include: [{ model: Product }],
    order: [['id', 'DESC']],
  });

  renderTemplate(OrderCustomer, { user, orders }, res);
};

exports.addNewOrder = async (req, res) => {
  const { userid, productid } = req.body;

  await Product.update({
    raw: true,
    isCompleted: true,
  }, {
    where: { id: productid },
    returning: true,
    plain: true,
  });
  const product = await Product.findOne({
    raw: true,
    where: { id: productid },
  });
  await Order.create({
    product_id: productid,
    user_id: userid,
  });
  const courier = await User.findOne({
    raw: true,
    where: { id: product.courier_id },
  });
  const customer = await User.findOne({
    raw: true,
    where: { id: userid },
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'skinner.vova@gmail.com',
      pass: 'czevnletifzmoyqm',
    },
  });

  const mailData = {
    from: 'skinner.vova@gmail.com',
    to: `${courier.email}`,
    subject: 'You have new order',
    html: `
    <h2>Order: ${product.name}</h2>
    <h2>Address: ${customer.address}</h2>
    <h2>Customer Email: ${customer.email}</h2>
    `,
  };

  transporter.sendMail(mailData, (error) => {
    if (error) throw createError(500, error.message);
    console.log('<=====> EMAIL HAS BEEN SENT <=====>');
    res.status(200).end();
  });
};

exports.removeOrder = async (req, res) => {
  const { orderid, productid } = req.body;

  await Order.destroy({
    where: { id: orderid },
  });
  await Product.update({
    isCompleted: false,
  }, {
    where: { id: productid },
    returning: true,
    plain: true,
  });

  const product = await Product.findOne({
    raw: true,
    where: { id: productid },
  });
  const courier = await User.findOne({
    raw: true,
    where: { id: product.courier_id },
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'skinner.vova@gmail.com',
      pass: 'czevnletifzmoyqm',
    },
  });

  const mailData = {
    from: 'skinner.vova@gmail.com',
    to: `${courier.email}`,
    subject: 'Order has been cancelled',
    html: `
    <h2>Order: ${product.name} has been cancelled</h2>
    `,
  };

  transporter.sendMail(mailData, (error) => {
    if (error) throw createError(500, error.message);
    console.log('email has been sent');
    res.status(200).end();
  });
};

exports.deleteOrderAndProduct = async (req, res) => {
  const { orderid, productid } = req.body;

  await Order.destroy({
    where: { id: orderid },
  });
  await Product.destroy({
    where: { id: productid },
  });

  res.status(200).end();
};
