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
