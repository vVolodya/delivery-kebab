const router = require('express').Router();

const { renderMap } = require('../controllers/mapContollers');

router.get('/', renderMap);

router.post('/', (req, res) => {
  const result = req.body;

  const arr = [];
  arr.push(result);
  console.log(arr, arr.length);
  // console.log(res.json({ requestBody: req.body }));
  
  res.json({ data: 'ok' });
});

module.exports = router;
