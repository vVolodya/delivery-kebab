const bcrypt = require('bcrypt');

const { renderTemplate } = require('../middlewares/helpers');

const { User } = require('../../db/models');

const Login = require('../views/Login');
const Register = require('../views/Register');

exports.renderRegister = (req, res) => {
  renderTemplate(Register, {}, res);
};

exports.userRegister = async (req, res) => {
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
};

exports.renderLogin = (req, res) => {
  renderTemplate(Login, {}, res);
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const passCheck = await bcrypt.compare(password, user.password);
  if (passCheck) {
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.redirect('/login?error=notfound');
  }
};

exports.userLogout = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('flashcards');
    res.redirect('/');
  });
};
