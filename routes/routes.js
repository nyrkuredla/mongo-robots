const express = require('express')
const router = express.Router()
const { getAllRobots, getRobotById, getWorkinRobots, getFunemployedRobots, getRobotByUsername, addRobot, updateRobot } = require('../dal')
const Robot = require('./models')
const passport = require('passport')

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
      console.log(chosenRobot)
      res.render('robotDetail', chosenRobot)
    })
  })

  router
    .route('/login')
    .get(function (req, res) {
      res.render('login')
    })
    //I set the password to equal the user's city for the time being, to avoid having to reset all of them and to have one that's relatively easy to access through the console log.
    .post(function (req, res) {
      const sesh = req.session
      if (getRobotByUsername()) {
      getRobotByUsername(req.body.username).then(function(foundUsr) {
      if (req.body.password == foundUsr.address.city) {
        req.session.usr = { name: foundUsr.name, id: foundUsr.id }
        let edit = ('/edit/' + foundUsr.id)
        res.redirect(edit)
      } else {
        res.render('no_touch')
      }
        })
      }
      else {
      res.send('Unsuccessful. Try again.')
    }
  })

  router
    .route('/logout')
      .get(function (req, res) {
      req.session.destroy()
      res.redirect('/robots')
    })

router
    .route('/edit/:id')
    .get(function (req, res) {
      if (req.isAuthenticated) {
      const robotId = req.params.id
      getRobotById(robotId).then(function (chosenRobot) {
        res.render('edit', {robot: chosenRobot})
      })
      }
      else {
        res.render('no_touch')
      }
    })
    .post(function (req, res) {
      console.log(req.body)
      const robotId = req.body.id
      const robotNew = req.body
      updateRobot(robotId, robotNew).then(function (robot) {
        res.redirect('/robots')
      })
    })


  module.exports = router
