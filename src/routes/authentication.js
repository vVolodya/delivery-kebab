const bcrypt = require('bcrypt');
const router = require('express').Router();
const { renderTemplate } = require('../middlewares/helpers');
const { User } = require('../../db/models');
const Login = require('../views/Login');
const Register = require('../views/Register');

router.get('/register', (req, res) => {
  renderTemplate(Register, {}, res);
});

router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      password,
      role,
      address,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      role,
      adress: address,
    });
    // * Создание сессии относительно нового юзера
    // * После создания req.session.newUser у нас появилась папка sessions,
    // * в которой находятся данные о нашем пользователе.
    req.session.userId = user.id;
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/login', (req, res) => {
  renderTemplate(Login, {}, res);
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const passCheck = await bcrypt.compare(password, user.password);
    if (passCheck) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.redirect('/login?error=notfound');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('flashcards');
      res.redirect('/');
    });
  } catch (error) {
    res.send('Error=====>', error);
  }
});

module.exports = router;
