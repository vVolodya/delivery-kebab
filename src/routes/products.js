const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const productsControllers = require('../controllers/productsControllers');

router.route('/')
  .get(catchErrors(productsControllers.renderNewProductPage))
  .post(catchErrors(productsControllers.addNewProduct));

module.exports = router;
