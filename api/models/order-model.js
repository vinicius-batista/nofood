const { Schema, model } = require('mongoose')

const orderModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  totalValue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  items: [
    {
      product: { type: Schema.Types.Map },
      quantity: { type: Number, default: 0 },
    },
  ],
})

orderModel.pre('save', next => {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  next()
})

module.exports = model('Order', orderModel)
