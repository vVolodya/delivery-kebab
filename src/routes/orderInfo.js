const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const orderInfoController = require('../controllers/orderInfoController');

router.get('/info/:id', catchErrors(orderInfoController.getOrderInfo));

module.exports = router;
