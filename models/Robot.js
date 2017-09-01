const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const RobotSchema = new mongoose.Schema({
id: { type: Number, required: true },
username: {type: String, required: true},
password: {type: String, select: false},
updated_at: Date,
name: { type: String, required: true },
avatar: {type: String, required: true},
university: String,
job: String,
skills: [String],
email: String,
phone: Number,
address: {
  street_num: Number,
  street_name: String,
  city: String,
  state_or_province: String,
  postal_code: Number,
  country: String
}
})

RobotSchema.pre('save', function (next){
  const user = this;
  if (!user.isModified('password')){
    next()
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      user.updated_at = new Date().toISOString();
      next();
    })
  })
})

RobotSchema.methods.comparePassword = function (pwd, dbPass, done) {
  // pwd = plain text
  bcrypt.compare(pwd, dbPass, (err, isMatch) => {
    done(err, isMatch)
  })
}

RobotSchema.statics.findByUsername = function (username, cb) {
  return this.find({username: username})
}


const Robot = mongoose.model('Robot', RobotSchema, 'users')

module.exports = Robot
