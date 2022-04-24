// Imported route groups
const home = require('./home')

/**
 * In this function the routes will be bound to the global router.
 * You can create a route group with express routers like in example home.js
 * @param app
 */
const setRoutes = (app) => {
    app.use('/', home)
}
module.exports = setRoutes
