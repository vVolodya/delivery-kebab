const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const courierProfileControllers = require('../controllers/courierProfileControllers');

router.get('/', catchErrors(courierProfileControllers.renderProfile));

module.exports = router;
