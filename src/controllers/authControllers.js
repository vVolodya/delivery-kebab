const bcrypt = require('bcrypt');

const { renderTemplate } = require('../middlewares/helpers');

const { User } = require('../../db/models');

const Login = require('../views/Login');
const Register = require('../views/Register');

exports.renderRegister = (req, res) => {
  // достаю messages из req.query и передаю их в Register.jsx
  const { messages } = req.query;
  renderTemplate(Register, { messages }, res);
};

exports.userRegister = async (req, res) => {
  // Делаю try/catch чтобы отловить ошибки и потом их использовать
  const {
    name, email, password, role, address,
  } = req.body;

  // Проблема: по логике вещей должна быть ошибка, если пароль, к примеру, слишком короткий
  // Однако bcrypt все равно будет хешировать даже пустое поле
  // => Создастся юзер, когда в пароле была ошибка
  // => Эту ошибку мы не увидим в sequelize validation errors
  // => Нужно как-то выцепить ошибку для пароля
  let passwordError = null;
  try {
    if (password.length < 8) {
      passwordError = new Error();
      // Пытаюсь имитировать ошибку секвалайза
      passwordError.errors = [
        {
          message: 'Your password should be at least 8 symbols long.',
          path: 'password',
        },
      ];
    }
    const hash = await bcrypt.hash(password, 10);
    // На этапе создания юзера мы можем выловить только ошибки сиквалайза (имя и имейл)
    // Ошибки пароля не выловить - из-за бикрипта
    const user = await User.create({
      name,
      email,
      password: hash,
      role,
      address,
    });

    // Сценарий где не было ошибок секвалайза, но была ошибка в пароле
    if (passwordError) {
      await user.destroy();
      throw passwordError;
    }

    req.session.userId = user.id;
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    let messages = [];

    // scenario 1 - only sequelize errors - только ошибки секвалайза (имя и имейл)
    if (passwordError === null) {
      messages = error.errors.map((e) => e.message);
    // scenario 3 - both sequelize and password errors - ошибки и секвалайза, и пароля
    } else if (error !== passwordError) {
      messages = error.errors
        .map((e) => e.message)
        .concat(
          passwordError.errors.map((e) => e.message),
        );
    // scenario 2 - only password errors - только ошибки пароля
    } else {
      error.errors.map((e) => e.message);
    }
    // error = {errors:[{message, path},{message, path}, ...]}
    // Получаю messages из всех ошибок, которые могут возникнуть при валидации
    res.redirect(`/register?messages=${messages.join(',')}`);
  }
};

exports.renderLogin = (req, res) => {
  const { messages } = req.query;
  renderTemplate(Login, { messages }, res);
};

exports.userLogin = async (req, res) => {
  // Буду выводить ошибку, что юзер не найден (из-за вопроса
  // безопасности не вдаюсь в подробности, что было введено неверно)
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('No user found for that email and password.');
    }
    const passCheck = await bcrypt.compare(password, user.password);
    if (passCheck) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      throw new Error('No user found for that email and password.');
    }
  } catch (error) {
    res.redirect(`/login?messages=${error.message}`);
  }
};

exports.userLogout = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('kebab');
    res.redirect('/');
  });
};
