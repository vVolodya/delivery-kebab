const router = require('express').Router();

const { renderMap } = require('../controllers/mapContollers');

router.get('/', renderMap);

module.exports = router;
