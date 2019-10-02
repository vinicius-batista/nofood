const { Schema, model } = require('mongoose')

const categoryModel = new Schema({
  title: { trim: true, index: true, required: true, type: String },
  description: { type: String },
  photo: { type: String, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

categoryModel.pre('save', next => {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  next()
})

module.exports = model('Category', categoryModel)
