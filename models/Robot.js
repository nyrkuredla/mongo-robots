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



const Robot = mongoose.model('Robot', RobotSchema, 'users')

module.exports = Robot
