const router = require('express').Router();

const { catchErrors } = require('../middlewares/errorHandlers');

const authControllers = require('../controllers/authControllers');

router.route('/register')
  .get(authControllers.renderRegister)
  .post(catchErrors(authControllers.userRegister));

router.route('/login')
  .get(authControllers.renderLogin)
  .post(catchErrors(authControllers.userLogin));

router.get('/logout', catchErrors(authControllers.userLogout));

module.exports = router;
