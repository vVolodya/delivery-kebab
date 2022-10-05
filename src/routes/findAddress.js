const router = require('express').Router();

const { findAddress } = require('../controllers/findAddressContolers');

router.get('/', findAddress);

module.exports = router;
