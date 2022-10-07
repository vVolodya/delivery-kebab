const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const productsControllers = require('../controllers/productsControllers');
const { isOrdered } = require('../middlewares/isOrdered');

router.route('/new')
  .get(catchErrors(productsControllers.renderNewProductPage))
  .post(catchErrors(productsControllers.addNewProduct));

router.route('/:id')
  .get(catchErrors(isOrdered), catchErrors(productsControllers.renderEditProductPage))
  .post(catchErrors(productsControllers.editProduct))
  .delete(catchErrors(productsControllers.deleteProduct));

module.exports = router;
