'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Devices extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Devices.belongsToMany(models.User, {through: models.Device_Connections, uniqueKey: 'devices_id'})
			// define association here
		}
	}
	Devices.init({
		authentication_token: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Devices',
	});

	return Devices;
};