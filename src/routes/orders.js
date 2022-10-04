const router = require('express').Router();

const ordersControllers = require('../controllers/ordersControllers');

router.route('/')
  .get(ordersControllers.renderNewOrderPage)
  .post(ordersControllers.addNewOrder);

module.exports = router;
