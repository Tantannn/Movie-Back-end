const User = require('../app/models/User')



module.exports = function AuthMiddleware(req, res, next) {
    if (req.query.hasOwnProperty('token')) {
        var token = { token: req.query.token }

        User.find(token).then(data => {
            // console.log(data);
            if (!data) {
                return res.status(401).send("Unauthorized")
            }
        }).catch(next)
        next()
    } else {
        return res.status(400).send("Not found keyword parram")
    }
}
