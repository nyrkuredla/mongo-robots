const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const userDal = require('./dal')
const routes = require('./routes/routes')

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(express.static('public'))

//routes
app.use('/', routes)


app.set('port', 3000)

app.listen(app.get('port'), function () {
  console.log('Application has started at port 3000!')
})
