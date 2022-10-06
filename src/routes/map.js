const router = require('express').Router();

const { renderMap } = require('../controllers/mapContollers');

router.get('/', renderMap);

router.post('/', (req, res) => {
  const { list } = req.body;
  res.send({ data: 'done' });
});

module.exports = router;
