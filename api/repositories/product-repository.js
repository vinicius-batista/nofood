require('../models/product-model')
const RepositoryBase = require('../bin/base/repository-base')

class ProductRepository {
  constructor() {
    this._base = new RepositoryBase('Product')
  }

  create(data) {
    return this._base.create(data)
  }

  update(id, data) {
    return this._base.update(id, data)
  }

  getAll() {
    return this._base.getAll()
  }

  getById(id) {
    return this._base.getById(id)
  }

  getByCategoryId(categoryId) {
    return this._base._Model.find({ categoryId })
  }

  delete(id) {
    return this._base.delete(id)
  }
}

module.exports = new ProductRepository()
