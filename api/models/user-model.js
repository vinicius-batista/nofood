const { Schema, model } = require('mongoose')

const userModel = new Schema({
  name: { trim: true, index: true, required: true, type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

userModel.pre('save', next => {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  next()
})

module.exports = model('User', userModel)
