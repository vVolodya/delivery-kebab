const { renderTemplate } = require('../middlewares/helpers');

const { User, Product } = require('../../db/models');

const NewProduct = require('../views/NewProduct');

exports.renderNewProductPage = async (req, res) => {
  const user = req.session.userId
    ? await User.findOne({ where: { id: req.session.userId } })
    : null;
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

  const newProduct = await Product.create({
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
