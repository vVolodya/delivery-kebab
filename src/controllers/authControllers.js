const bcrypt = require('bcrypt');

const { renderTemplate } = require('../middlewares/helpers');

const { User } = require('../../db/models');

const Login = require('../views/Login');
const Register = require('../views/Register');

exports.renderRegister = (req, res) => {
  renderTemplate(Register, {}, res);
};

exports.userRegister = async (req, res) => {
  try {
    const {
      name, email, password, role, address,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      role,
      address,
    });
    req.session.userId = user.id;
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).json({ error: error.message });
  }
};

exports.renderLogin = (req, res) => {
  renderTemplate(Login, {}, res);
};

exports.userLogin = async (req, res) => {
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
};

exports.userLogout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('flashcards');
      res.redirect('/');
    });
  } catch (error) {
    res.send('Error=====>', error);
  }
};
