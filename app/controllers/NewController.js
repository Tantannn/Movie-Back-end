const Data = require('../models/data')
class NewController {

    //404 error
    home(req, res, next) {
        if ( req.params.slug)
        {
            return res.status(404).send("<h1>Route not found</h1>");
        }
    }
}

module.exports = new NewController