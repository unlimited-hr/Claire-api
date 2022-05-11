'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Physical_IDs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Physical_IDs.init({
    physical_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Physical_IDs',
  });
  return Physical_IDs;
};