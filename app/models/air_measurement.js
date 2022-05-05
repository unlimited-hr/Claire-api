'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Air_Measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Air_Measurement.init({
    temperature: DataTypes.INTEGER,
    humidity: DataTypes.INTEGER,
    co2: DataTypes.INTEGER,
    tvoc: DataTypes.INTEGER,
    device_id: DataTypes.STRING,
    year_built: DataTypes.INTEGER,
    stories: DataTypes.INTEGER,
    cooktop_fuel: DataTypes.STRING,
    oven_fuel: DataTypes.STRING,
    measured_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Air_Measurement',
  });
  return Air_Measurement;
};