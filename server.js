const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const userDal = require('./dal')
const routes = require('./routes/routes')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('passport-local')
const localStrategy = require('passport-local').Strategy


// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

//setting public folder
app.use(express.static('public'))

// setting up bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//setting up validation
app.use(validator());

//establishing session
app.use(session({
    secret: 'hush hush',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}))

//setting up passport
app.use(passport.initialize());
app.use(passport.session());

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
