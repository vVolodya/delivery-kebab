const router = require('express').Router();

const { findUserRenderHome } = require('../controllers/indexController');

router.get('/', findUserRenderHome);

module.exports = router;
