const express = require('express')
const mainRoutes = require('./routes/index')
// const NewController = require('./')
const AuthMiddleware = require('./middleware/authorized')
const cors = require('cors');
const db = require('./config/db')

//connect db
db.connect()

const app = express()
const port = 5000

app.use(express.urlencoded({
    extended : true
}))
app.use(cors());
app.use(AuthMiddleware)
app.set('view engine', 'ejs')
app.set('views', 'views');





mainRoutes(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
