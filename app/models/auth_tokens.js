'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auth_Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auth_Tokens.init({
    token: DataTypes.STRING,
    created_at: DataTypes.DATE,
    expired: DataTypes.BOOLEAN,
    permissions: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Auth_Tokens',
  });
  return Auth_Tokens;
};