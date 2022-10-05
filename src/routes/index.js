const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const { findUserRenderHome } = require('../controllers/indexController');

router.get('/', catchErrors(findUserRenderHome));

module.exports = router;
