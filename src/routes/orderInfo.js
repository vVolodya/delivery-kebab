const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const orderInfoController = require('../controllers/orderInfoController');
const { isCustomer } = require('../middlewares/isCustomer');

router.get(
  '/info/:id',
  catchErrors(isCustomer),
  catchErrors(orderInfoController.getOrderInfo),
);

module.exports = router;
