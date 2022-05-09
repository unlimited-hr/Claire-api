const db = require("../models/index.js")

db.User.belongsToMany(db.Device, { 
	through: db.Device_Connections, foreignKey: 'user_id', })

db.Device.belongsToMany(db.User, { 
	through: db.Device_Connections, foreignKey: 'device_id' })

db.Device_Connections.belongsTo(db.Device, {
	foreignKey: 'id'
});

db.Device_Connections.belongsTo(db.User, {
	foreignKey: 'id'
});

db.Air_Measurement.belongsTo(db.Device, { foreignKey: "device_id" })

db.Device.hasMany(db.Air_Measurement, { foreignKey: "device_id" })


try {
    db.sequelize.authenticate()
    console.log('Connection has been established successfully.');
    module.exports = db
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db
