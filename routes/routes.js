const express = require('express')
const router = express.Router()
const { getAllRobots, getRobotById, getWorkinRobots, getFunemployedRobots, getRobotByUsername, addRobot, updateRobot } = require('../dal')
const Robot = require('../models/Robot')
const passport = require('passport')
const { isAuthenticated } = require('../passport')

router
  .route('/')
  .get(function (req, res) {
    res.render('home')
  })

router
  .route('/robots')
  .get(function (req, res) {
    //Fill in with robots partial
    getAllRobots().then(function (robots) {
      res.render('robots', {robots})
    })
  })

router
    .route('/funemployed')
    .get(function (req, res) {
      getFunemployedRobots().then(function (robots) {
      res.render('funemployed', {robots})
    })
  })

router
  .route('/workin')
  .get(function (req, res) {
    getWorkinRobots().then(function (robots) {
    res.render('workin', {robots})
  })
})

router
  .route('/robots/:id')
  .get(function (req, res) {
      getRobotById(req.params.id).then(function(chosenRobot) {
      res.render('robotDetail', chosenRobot)
    })
  })

  router
    .route('/login')
    .get(function (req, res) {
      res.render('login')
    })
    .post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log('err1, yo')
        return next(err)
      }
      if (!user) {
        return res.redirect('/login')
      }
      req.logIn(user, (err, obj) => {
        if (err) {
          console.log('err2, yo')
          return next(err)
        }
        res.redirect('/edit')
      })
    })(req, res, next)
  })


    //I set the password to equal the user's city for the time being, to avoid having to reset all of them and to have one that's relatively easy to access through the console log. Newly created users should have their passwords verified as normal using the password field.

  //   .post(function (req, res) {
  //     const sesh = req.session
  //     if (getRobotByUsername()) {
  //     getRobotByUsername(req.body.username).then(function(foundUsr) {
  //     if ((req.body.password == foundUsr.address.city) || (req.body.password == foundUsr.password)) {
  //       req.session.usr = { name: foundUsr.name, id: foundUsr.id }
  //       let edit = ('/edit/' + foundUsr.id)
  //       res.redirect(edit)
  //     } else {
  //       res.render('no_touch')
  //     }
  //       })
  //     }
  //     else {
  //     res.send('Unsuccessful. Try again.')
  //   }
  // })

  router
    .route('/logout')
      .get(function (req, res) {
      req.session.destroy()
      res.redirect('/robots')
    })

router
  .route('/add')
  .get(function (req, res) {
    res.render('add')
  })
  .post(function (req, res) {
    const sesh = req.session;
    addRobot(req.body).then(function (robot) {
      res.render('robots')
    })
  })

router
    .route('/edit')
    .get(function (req, res) {
      if (req.isAuthenticated) {
      const robotUsername = req.user.username
      console.log(robotUsername)
      getRobotByUsername(robotUsername).then(function (chosenRobot) {
        res.render('edit', {robot: chosenRobot})
      })
      }
      else {
        console.log(req.user)
        res.render('no_touch')
      }
    })
    .post(function (req, res) {
      const robotUsername = req.body.username
      const robotNew = req.body
      updateRobot(robotUsername, robotNew).then(function (robot) {
        res.redirect('/robots')
      })
    })


  module.exports = router
