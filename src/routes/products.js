const router = require('express').Router();

const productsControllers = require('../controllers/productsControllers');

router.route('/')
  .get(productsControllers.renderNewProductPage)
  .post(productsControllers.addNewProduct);

module.exports = router;
