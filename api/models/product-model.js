const { Schema, model } = require('mongoose')

const productModel = new Schema({
  name: { trim: true, index: true, required: true, type: String },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  active: { type: Boolean, default: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
})

productModel.pre('save', next => {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  next()
})

module.exports = model('Product', productModel)
