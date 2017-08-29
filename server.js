const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const userDal = require('./dal')
const routes = require('./routes/routes')
const session = require('express-session')


// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(express.static('public'))

// setting up bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//establishing session
app.use(session({
    secret: 'hush hush',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}))

//setting log-in to be false unless specifically logged in
app.use(function (req, res, next) {
  if (req.session.usr) {
    req.isAuthenticated = true
  } else {
    req.isAuthenticated = false
  }
  next()
})



//routes
app.use('/', routes)


app.set('port', 3000)

app.listen(app.get('port'), function () {
  console.log('Application has started at port 3000!')
})
