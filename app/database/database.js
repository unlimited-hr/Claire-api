// todo: Create database connection

// const fs = require('fs');
// const path = require('path');
// const basename = path.basename("../models");
// const { Sequelize } = require('sequelize');
// const { host } = require('../helpers/database/database-host');
// const db = {}

// const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,
//     {
//         dialect: `${process.env.DATABASE_DIALECT}`,
//         host: `${process.env.DATABASE_HOST}`,
//         port: `${process.env.DATABASE_PORT}`
//     });

// fs
//     .readdirSync("../models/index.js")
//     .filter(file => {
//         console.log(file)
//         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(file => {
//         const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//         db[model.name] = model;
//     });

// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         const path = require('path');
//         const basename = path.basename("../models");
//         const { Sequelize } = require('sequelize');
//         const { host } = require('../helpers/database/database-host');
//         const db = {}
        
//         const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,
//             {
//                 dialect: `${process.env.DATABASE_DIALECT}`,
//                 host: `${process.env.DATABASE_HOST}`,
//                 port: `${process.env.DATABASE_PORT}`
//             });
        
//         fs
//             .readdirSync("../models/index.js")
//             .filter(file => {
//                 console.log(file)
//                 return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//             })
//             .forEach(file => {
//                 const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//                 db[model.name] = model;
//             });
        
//         Object.keys(db).forEach(modelName => {
//             if (db[modelName].associate) {
//                 db[modelName].associate(db);
//             }
//         });
        
//         db.sequelize = sequelize


const db = require("../models/index.js")

try {
    db.sequelize.authenticate()
    console.log('Connection has been established successfully.');
    module.exports = db
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db
