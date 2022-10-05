const router = require('express').Router();

const { renderMap } = require('../controllers/mapContollers');

router.get('/', renderMap);

router.post('/', (req, res) => {
  const result = req.body;
  console.log(result);
  res.send({ data: 'done' });
});

module.exports = router;
