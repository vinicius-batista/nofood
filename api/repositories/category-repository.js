require('../models/category-model')
const RepositoryBase = require('../bin/base/repository-base')

class CategoryRepository {
  constructor() {
    this._base = new RepositoryBase('Category')
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

  delete(id) {
    return this._base.delete(id)
  }
}

module.exports = new CategoryRepository()
