const createError = require('http-errors');
const { renderTemplate } = require('../middlewares/helpers');

const { User, Product } = require('../../db/models');

const NewProduct = require('../views/Products/NewProduct');
const EditProduct = require('../views/Products/EditProduct');

exports.renderNewProductPage = async (req, res) => {
  const user = req.session.userId
    ? await User.findOne({ where: { id: req.session.userId } })
    : null;
  if (!user || user.role === 'customer') {
    return res.redirect('/');
  }
  renderTemplate(NewProduct, { user }, res);
};

exports.addNewProduct = async (req, res) => {
  // Getting courierID
  const { userId } = req.session;
  // Adding Image to Uploads folder
  const { image } = req.files;
  if (!image) {
    res.sendStatus(400);
  } else if (image.mimetype === 'image/jpg') {
    res.sendStatus(400);
  } else {
    image.mv(`./public/uploads/${image.name}`);
  }
  // Adding Product to Database
  const {
    name, address, price, discount,
  } = req.body;

  await Product.create({
    name,
    picture_name: image.name,
    price,
    discount,
    address,
    courier_id: userId,
  });
  // Redirect to Home page
  res.redirect('/');
};

exports.renderEditProductPage = async (req, res) => {
  const { userId } = req.session;

  const user = req.session.userId
    ? await User.findOne({ where: { id: req.session.userId } })
    : null;

  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (product.courier_id === userId) {
    renderTemplate(EditProduct, { user, product }, res);
  } else {
    const err = createError(401, 'Unauthorized');
    throw err;
  }
};

exports.editProduct = async (req, res) => {
  const { image } = req.files;

  if (image.mimetype !== 'image/jpeg') {
    throw createError(400, 'Invalid file type');
  } else {
    image.mv(`./public/uploads/${image.name}`);
  }

  const {
    name, address, price, discount,
  } = req.body;

  await Product.update({
    name,
    picture_name: image.name,
    price,
    discount,
    address,
  }, {
    where: { id: req.params.id },
    returning: true,
    plain: true,
  });
  res.redirect('/');
};

exports.deleteProduct = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ isDeleteSuccessful: true });
};
