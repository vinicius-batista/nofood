const mongoose = require('mongoose')

class RepositoryBase {
  constructor(Model) {
    this._Model = mongoose.model(Model)
  }

  create(data) {
    const model = new this._Model(data)
    return model.save()
  }

  update(id, data) {
    return this._Model.findByIdAndUpdate(id, { $set: data })
  }

  getAll(projection) {
    return this._Model.find(projection)
  }

  getById(id, projection) {
    return this._Model.findById(id, projection)
  }

  delete(id) {
    return this._Model.findByIdAndDelete(id)
  }
}

module.exports = RepositoryBase
