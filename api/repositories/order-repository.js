require('../models/order-model')
const RepositoryBase = require('../bin/base/repository-base')

class OrderRepository {
  constructor() {
    this._base = new RepositoryBase('Order')
  }

  create(data) {
    return this._base.create(data)
  }

  update(id, data) {
    return this._base.update(id, data)
  }

  getAll(userId) {
    return this._base._Model.find({ userId })
  }

  getById(id) {
    return this._base.getById(id)
  }

  delete(id) {
    return this._base.delete(id)
  }
}

module.exports = new OrderRepository()
