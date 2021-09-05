'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer,{
        foreignKey: 'customer_id'
      });

      this.belongsToMany(models.Order, {
        through: 'Order',
        as: 'products',
        foreignKey: 'detail_id'
      });

    }
  };
  Detail.init({
    deliver: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Detail',
    tableName: 'details'
  });
  return Detail;
};