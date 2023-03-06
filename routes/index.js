const homeRouters = require('./home')
const movieRouters = require('./movie')

function route(app) {
    app.use('/movies', movieRouters)
    app.use('/', homeRouters)
}

module.exports = route