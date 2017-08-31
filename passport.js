const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const Robot = require('./models/Robot')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  Robot.getRobotById(id, (err, user) => {
    done(err, user)
  })
})

// local strategy
passport.use(new LocalStrategy((username, password, done) => {
  Robot.findOne({ username: username.toLowerCase() }, '+password', (
    err,
    user
  ) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, { msg: `Username ${username} not found.` })
    }
    user.comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        return done(err)
      }
      if (isMatch) {
        console.log(user)
        return done(null, user)
      }
      return done(null, false, { msg: 'Invalid email or password.' })
    })
  })
}))


const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
module.exports = { isAuthenticated }
