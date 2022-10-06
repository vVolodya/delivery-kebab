const router = require('express').Router();

const { renderMap } = require('../controllers/mapContollers');
const { Distanse } = require('../../db/models');
const { userLogin } = require('../controllers/authControllers');


router.get('/', renderMap);

router.post('/', async (req, res) => {
  const result = await req.body;
  req.session.distanse = result;
  
  // const id_product = result.id;
  // const distance = result.distanse.value;
  // const time = result.time.value;
  console.log(req.session);


  // const newDistance = await Distanse.create({ id_product, distance, time });
  // User.findAll(  )


  // console.log(result);
  // console.log(res.json({ requestBody: req.body }));
  
  res.json({ data: 'ok' });
});

module.exports = router;
