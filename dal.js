//pulling in Robot schema from model file
const Robots = require('./models/Robot')

//setting up mongoose and bluebird
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/robots');

//getting all robots from db
function getAllRobots () {
  return Robots.find()
}

//getting robot by ID#
function getRobotById (RobotId) {
  return Robots.findOne({ "id": RobotId });
}

//getting robot by username
function getRobotByUsername (robotUsername) {
  return Robots.findOne({ "username" : robotUsername})
}

function getFunemployedRobots() {
  return Robots.find({ "job": null });
}

function getWorkinRobots () {
  return Robots.find( { "job" : {$ne:null} })
}


//adding new robot item to db
function addRobot (newRobot) {
  const robot = new Robots(newRobot);
  robot.save(function (err) {
    console.log(err)
  })
  console.log("Hooray! New robot added.")
  // return Promise.resolve("success")
}

//updating collection using username
function updateRobot (robotUsername, robotNew) {
  return Robots.findOneAndUpdate({ "username": robotUsername }, robotNew, { upsert : false })
}

//exporting functions
module.exports = {
  getAllRobots, getRobotById, getWorkinRobots, getFunemployedRobots, getRobotByUsername, addRobot, updateRobot
}


//
//
// var MongoClient = require('mongodb').MongoClient;
// // const robotData = require('./robot-data.js');
// const url = 'mongodb://localhost:27017/robots'
// // const robotJSON = JSON.stringify(robotData);
// let robots = [];
// let funemployedRobots = [];
// let workinRobots = [];
//
// // Use connect method to connect to the server
// function connectMongodb (url, cb) {
//   MongoClient.connect(url, cb)
//   console.log("MongoDB is connected!")
// }
//  //getting all robots in collection
// function getAllDocs (err, db) {
//   console.log(err)
//   const collection = db.collection('users')
//   collection.find({}).toArray(function (err, docs) {
//     robots = docs
//     db.close();
//   })
// }
//
// function getPeople () {
//   connectMongodb(url, getAllDocs)
//   return robots;
// }
//
//
// //getting unemployed robots
// function getFunemployedRobots (err, db) {
//   console.log(err)
//   const collection = db.collection('users')
//   collection.find({job: null}).toArray(function (err, docs) {
//     funemployedRobots = docs
//     db.close();
//   })
// }
//
// function getFunemployed () {
//   connectMongodb(url, getFunemployedRobots)
//   return funemployedRobots;
// }
//
// //getting working robots
// function getWorkinRobots (err, db) {
//   console.log(err)
//   const collection = db.collection('users')
//   collection.find({job: {$not: {$in: [null]}}}).toArray(function (err, docs) {
//     workinRobots = docs;
//     db.close();
//   })
// }
//
// function getWorkin () {
//   connectMongodb(url, getWorkinRobots)
//   return workinRobots;
// }
//
// //getting single robot by ID number from request parameters
//
// function getOneRobot (robotId) {
//   let oneRobot = {};
//   for (let i in robots) {
//     if (robots[i].id == robotId) {
//       oneRobot = robots[i];
//     }
//   }
//   return oneRobot
// }
//
//
// module.exports = {
//   getAllDocs: getAllDocs,
//   getPeople: getPeople,
//   getFunemployed: getFunemployed,
//   getFunemployedRobots: getFunemployedRobots,
//   getWorkinRobots: getWorkinRobots,
//   getWorkin: getWorkin,
//   getOneRobot: getOneRobot
// }
