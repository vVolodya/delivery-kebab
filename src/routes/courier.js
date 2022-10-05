const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const courierControllers = require('../controllers/courierControllers');

router.get('/profile', catchErrors(courierControllers.renderProfile));

module.exports = router;
