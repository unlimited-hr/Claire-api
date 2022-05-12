# Claire-api

The app is made with Model-View-Controller (MVC) design pattern.

### Get started
Make sure to copy the .env.example file and set your desired values.

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
npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string

npx sequelize-cli model:generate --name Device --attributes year_built:integer,stories:integer,cooktop_fuel:string,oven_fuel:string,physical_id:integer

npx sequelize-cli model:generate --name Air_Measurement --attributes temperature:integer,humidity:integer,co2:integer,tvoc:integer,device_id:string,measured_at:date

npx sequelize-cli model:generate --name Device_Connections --attributes device_id:integer,user_id:integer

npx sequelize-cli model:generate --name Auth_Tokens --attributes token:string,created_at:date,expired:boolean,permissions:integer

npx sequelize-cli model:generate --name Physical_IDs --attributes physical_id:string
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

Bij data gemiddelde nemen van afgelopen uur/dag/week/maand

## API Endpoints

`GET | */iaq/:user_id` <br>

Geeft gemeten luchtkwaliteit van de apparaten gekoppeld aan een gebruiker terug. <br>
In de url geef je een gebruiker-id mee. <br><br>

`GET | */iaq/:user_id/:period` <br>
Geeft gemeten luchtkwaliteit van een gebruiker binnen een periode terug <br>
Hour geeft alles van afgelopen uur terug, Day alles van afgelopen dag. Etc.<br>
Mogelijke waarden: `minute, hour, day, week, month, year`. Je kan ook een getal (in minuten) meegeven. <br><br>

`GET | */iaq/:user_id/predict` <br>
Geeft als string een tip aan de gebruiker terug. Op dit moment nog statisch. <br><br>

`GET | */iaq/create?api_key=[key]&t=[temperatuur]&h=[luchtvochtigheid]&tvoc=[tvoc]&co2=[co2]` <br>
Voegt gemeten luchtkwaliteit toe. <br>
In het url geef je de gemeten waarden en een api-key mee. <br>

`PUT, POST | */devices` <br>
Voegt apparaat toe aan de database. <br>
In de body geef je de omgevingsvariabelen van het apparaat en een apparaat-id (fysieke code) mee. <br>
Je kan zowel een PUT- als een POST request doen. Hiermee kun je ervoor kiezen eerst het apparaat te registreren en later pas de omgevingsvariabelen eraan toe te voegen.<br>
Gebruik bij PUT het url `claireURL/devices/:device-id`. Hierbij is device-id niet de fysieke code maar die in de database. Deze krijg je terug wanneer je het apparaat met POST aanmaakt. <br>
Je krijgt de JSON van het gemaakte of aangepaste object terug.
```json
{ "physical_id": 1, "year_built": 2008, "stories": 2, "cooktop_fuel": "gas", "oven_fuel": "electricity" }
```

`POST | */iaq` <br>
Voegt gemeten luchtkwaliteit toe. <br>
In de body geef je de gemeten waarden en een apparaat-id mee. <br>
```json
{ "device_id": 1, "temperature": 20, "tvoc": 800, "co2": 300, "humidity": 50 }
```
`POST | */connections` <br>
Verbindt een gebruiker en apparaat aan elkaar. <br>
In de body geeft je het gebruiker-id en het apparaat-id mee. Apparaat-id is niet de fysieke code maar het database id.<br>
```json
{ "device_id": 1, "user_id": 1 }
```

`POST | */users` <br>
Maakt een nieuwe gebruiker aan. <br>
In de body geef je een e-mail en een wachtwoord mee. <br>
```json
{ "email": "jane@example.com", "password": "CorrectHorseBatteryStaple" }
```

`DELETE | */users/:user_id` <br>
Verwijdert inloggegevens, id en apparaatverbindingen van een gebruiker. <br>
In de url geef je het id mee van de gebruiker die je wilt vergeten. <br><br>

