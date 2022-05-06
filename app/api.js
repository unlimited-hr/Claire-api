const run = require('./http/kernel')
const express = require('express');
const bp = require('body-parser');
const app = express();

app.use(bp.json())
app.use(bp.urlencoded({extendedparser: true}));

class Api {

    app = app

    constructor() {
        run(this.app).then(r => console.log({
            status: 'App successfully started',
            url: `http://${process.env.HOST}:${process.env.PORT}/`,
        }))
    }

}
module.exports = Api
