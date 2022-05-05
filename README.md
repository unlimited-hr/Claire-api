# Claire-api

The app is made with Model-View-Controller (MVC) design pattern.

### Get started
Make sure to copy the .env.example file and set your desired values.

```dotenv
PORT=6666
HOST=localhost
```

### Create routes
In the 'Routes/index.js' file you can declare your app routes.

```js
/**
 * In this function the routes will be bound to the global router.
 * You can create a route group with express routers like in example home.js
 * @param app
 */
// Imported route groups
const home = require('./home')

const setRoutes = (app) => {
    app.get('/home', (req, res) => {
        res.json({
            message: 'Hello world'
        })
            .status(200)
    })
}
```

#### Route groups
You can also create route groups like this.

home.js
```js

const express = require('express')
const router = express.Router()
const logger = require('../Http/Middleware/logger')

// Middleware that is specific to this router
router.use(logger)
// Define routes
router.get('/', (req, res) => {
    res.json({
        message: 'Home page'
    }).status(200)
})
// define the about route
router.post('/create-user', (req, res) => {
    // Your code to save user
    res.send('About birds')
})

// Do not forget to export the router
module.exports = router

```

To learn more about using express.Router

Reference: https://expressjs.com/en/guide/routing.html

### Installing MySql

On Ubuntu:
```sh
sudo apt install mysql-server
sudo systemctl start mysql.service
sudo mysql_secure_installation
sudo mysql
```

### Creating MySQL Database

Make sure to note the port, database, username and password in the .env file!
```sql
SHOW GLOBAL VARIABLES LIKE 'PORT';
CREATE USER 'claire'@'localhost' IDENTIFIED BY 'claire_password';
CREATE DATABASE api;
GRANT ALL ON api.* TO 'claire'@'localhost'; -- less broad priveleges?
```

### Creating models & migration

This project uses sequelize ORM to make use of the model creation and migrations.

Create models for Claire-API db:
```sh
npx sequelize-cli model:generate --name User --attributes email:string,password:string
npx sequelize-cli model:generate --name Devices --attributes authentication_token:string
npx sequelize-cli model:generate --name Air_Measurement --attributes temperature:integer,humidity:integer,co2:integer,tvoc:integer,device_id:string,year_built:integer,stories:integer,cooktop_fuel:string,oven_fuel:string,measured_at:date
npx sequelize-cli model:generate --name Device_Connections --attributes device_id:integer,user_id:integer
npx sequelize-cli model:generate --name Auth_Tokens --attributes token:string,created_at:date,expired:boolean,permissions:integer
```

### Running migrations

```shell
npx sequelize-cli db:migrate
```

Undo migration

```shell
npx sequelize-cli db:migrate:undo
```
=======
Reference: https://expressjs.com/en/guide/routing.html
