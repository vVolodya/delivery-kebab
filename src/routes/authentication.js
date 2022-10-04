const router = require('express').Router();

const authControllers = require('../controllers/authControllers');

router.get('/register', authControllers.renderRegister);
router.post('/register', authControllers.userRegister);
router.get('/login', authControllers.renderLogin);
router.post('/login', authControllers.userLogin);
router.get('/logout', authControllers.userLogout);

module.exports = router;
