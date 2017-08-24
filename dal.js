var MongoClient = require('mongodb').MongoClient;
// const robotData = require('./robot-data.js');
const url = 'mongodb://localhost:27017/robots'
// const robotJSON = JSON.stringify(robotData);
let robots = [];
let funemployedRobots = [];
let workinRobots = [];

// Use connect method to connect to the server
function connectMongodb (url, cb) {
  MongoClient.connect(url, cb)
  console.log("MongoDB is connected!")
}
 //getting all robots in collection
function getAllDocs (err, db) {
  console.log(err)
  const collection = db.collection('users')
  collection.find({}).toArray(function (err, docs) {
    robots = docs
    db.close();
  })
}

function getPeople () {
  connectMongodb(url, getAllDocs)
  return robots;
}


//getting unemployed robots
function getFunemployedRobots (err, db) {
  console.log(err)
  const collection = db.collection('users')
  collection.find({job: null}).toArray(function (err, docs) {
    funemployedRobots = docs
    db.close();
  })
}

function getFunemployed () {
  connectMongodb(url, getFunemployedRobots)
  return funemployedRobots;
}

//getting working robots
function getWorkinRobots (err, db) {
  console.log(err)
  const collection = db.collection('users')
  collection.find({job: {$not: {$in: [null]}}}).toArray(function (err, docs) {
    workinRobots = docs;
    db.close();
  })
}

function getWorkin () {
  connectMongodb(url, getWorkinRobots)
  return workinRobots;
}

//getting single robot by ID number from request parameters

function getOneRobot (robotId) {
  let oneRobot = {};
  for (let i in robots) {
    if (robots[i].id == robotId) {
      oneRobot = robots[i];
    }
  }
  return oneRobot
}


module.exports = {
  getAllDocs: getAllDocs,
  getPeople: getPeople,
  getFunemployed: getFunemployed,
  getFunemployedRobots: getFunemployedRobots,
  getWorkinRobots: getWorkinRobots,
  getWorkin: getWorkin,
  getOneRobot: getOneRobot
}
