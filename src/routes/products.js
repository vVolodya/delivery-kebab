const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const productsControllers = require('../controllers/productsControllers');

router.route('/new')
  .get(catchErrors(productsControllers.renderNewProductPage))
  .post(catchErrors(productsControllers.addNewProduct));

router.route('/:id')
  .get(catchErrors(productsControllers.renderEditProductPage))
  .post(catchErrors(productsControllers.editProduct))
  .delete(catchErrors(productsControllers.deleteProduct));

module.exports = router;
