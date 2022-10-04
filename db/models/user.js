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
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    adress: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
