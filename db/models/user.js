const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Product }) {
      // define association here
      this.hasMany(Order, { foreignKey: 'user_id' });
      this.hasMany(Product, { foreignKey: 'courier_id' });
    }
  }
  // Прописываю правила (sequelize validation attributes)
  // Имя не может быть пустым
  // Имейл должен соответствовать правилам секвалайза
  // Логика пароля тут не сработает, так как bctypt хеширует даже пустое поле
  // sequelize создает error => message увижу в error
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'You must provide a name.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    role: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: {
          msg: 'You must provide a valid email.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
