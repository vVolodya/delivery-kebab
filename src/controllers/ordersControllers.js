const { renderTemplate } = require('../middlewares/helpers');

const NewOrder = require('../views/NewOrder');

exports.renderNewOrderPage = (req, res) => {
  renderTemplate(NewOrder, null, res);
};

exports.addNewOrder = (req, res) => {
  // Adding Image to Public folder
  const { image } = req.files;
  if (!image) {
    res.sendStatus(400);
  } else if (/^image/.test(image.mimetype)) {
    res.sendStatus(400);
  } else {
    image.mv(`./public/uploads/${image.name}`);
    res.sendStatus(200);
  }
};
