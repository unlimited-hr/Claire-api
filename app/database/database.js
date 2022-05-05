// todo: Create database connection

const {Sequelize} = require('sequelize');
const {host} = require('../helpers/database/database-host');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: 'mysql',
    host: `${process.env.DATABASE_HOST}` ,
    port: `${process.env.DATABASE_PORT}`,
    dialectOptions: {
        // Your mariadb options here
        // connectTimeout: 1000
    }
});


    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }



module.exports = connection
// todo: Create database configuration

