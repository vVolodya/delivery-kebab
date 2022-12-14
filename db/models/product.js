const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, User }) {
      // define association here
      this.hasOne(Order, { foreignKey: 'product_id' });
      this.belongsTo(User, { foreignKey: 'courier_id' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    picture_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    address: DataTypes.STRING,
    courier_id: DataTypes.INTEGER,
    isCompleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
