const express = require('express')
const router = express.Router()
const dal = require('../dal')

router
  .route('/')
  .get(function (req, res) {
    console.log(dal.getPeople())
    res.render('home')
  })

router
  .route('/users')
  .get(function (req, res) {
    //Fill in with users partial
    const users = dal.getPeople();
    res.render('users', { users: users });
  })

router
    .route('/funemployed')
    .get(function (req, res) {
      const users = dal.getFunemployed();
      console.log(users)
      res.render('funemployed', {users: users})
    })

router
  .route('/workin')
  .get(function (req, res) {
    const users = dal.getWorkin();
    console.log(users)
    res.render('workin', {users: users})
  })

router
  .route('/users/:id')
  .get(function (req, res) {
    const chosenUser = dal.getOneRobot(req.params.id);
    if (chosenUser) {
      res.render('userDetail', chosenUser)
    } else {
      res.send("I mustache you a question. Hahaha! Get it? ...No, but seriously, you have to enter a correct user ID up there, or else I can't help you.")
    }
  })

  router
    .route('/login')
    .get(function (req, res) {
      res.render('login')
    })

    //I set the password to equal the user's post code for the time being, to avoid having to reset all of them and to have one that's relatively easy to access through the console log.
    .post(function (req, res) {
      const sesh = req.session
      const foundUsr = dal.getRobotByUsername(req.body.username)
      console.log(foundUsr)
      if (req.body.password === foundUsr.address.postal_code) {
        req.session.usr = { name: foundUsr.name, id: foundUsr.address.postal_code }
        let edit = ('/edit/' + foundUsr.address.postal_code)
        console.log(edit)
        res.redirect(edit)
      } else {
        res.send('HEY! No touching.')
      }
    })

  router
    .route('/logout')
      .get(function (req, res) {
      req.session.destroy()
      res.redirect('/users')
    })

router
    .route('/edit/:id')



  module.exports = router
