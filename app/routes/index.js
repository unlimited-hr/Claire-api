// Imported route groups
const UserRouter = require('./userRouter')
const MeasurementRouter = require('./measurementRouter')
const DeviceRouter = require('./deviceRouter')
const ConnectionRouter = require('./connectionRouter')

const setRoutes = (app) => {
    app.use('/users', UserRouter)
    app.use('/iaq', MeasurementRouter)
    app.use('/devices', DeviceRouter)
    app.use('/connections', ConnectionRouter)
}
module.exports = setRoutes
