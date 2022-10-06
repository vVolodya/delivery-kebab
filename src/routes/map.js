const router = require('express').Router();

router.post('/', (req, res) => {
  const { resultDistance } = req.body;
  req.session.distanceData = resultDistance;
  res.status(200).end();
});

module.exports = router;
