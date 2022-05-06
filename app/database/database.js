// todo: Create database connection

const { Sequelize } = require('sequelize');
const { host } = require('../helpers/database/database-host');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,
    {
        dialect: `${process.env.DATABASE_DIALECT}`,
        host: `${process.env.DATABASE_HOST}`,
        port: `${process.env.DATABASE_PORT}`
    });


try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    module.exports = sequelize
    console.log(sequelize)

    return sequelize
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
