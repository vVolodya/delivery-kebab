const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const orderController = require('../controllers/orderController');

router.route('/')
  .get(catchErrors(orderController.renderYourOrdersPage))
  .post(catchErrors(orderController.addNewOrder));

router.route('/:id')
  .post(catchErrors(orderController.removeOrder))
  .delete(catchErrors(orderController.deleteOrderAndProduct));

module.exports = router;
