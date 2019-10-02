require('../models/user-model')
const RepositoryBase = require('../bin/base/repository-base')
const bcrypt = require('bcrypt')

class UserRepository {
  constructor() {
    this._base = new RepositoryBase('User')
    this._projection = 'name email _id photo'
  }

  isEmailRegistred(email) {
    return this._base._Model.findOne({ email }).then(user => !!user)
  }

  async authenticate(email, password) {
    const user = await this._base._Model.findOne({ email })

    if (user) {
      const match = await bcrypt.compare(password, user.password)

      if (match) {
        delete user.password
        return user
      }
    }
  }

  async create(data) {
    const password = await bcrypt.hash(data.password, 10)
    data.password = password

    const user = await this._base.create(data, this._projection)

    delete user.password
    return user
  }

  update(id, { email, name, photo }) {
    return this._base.update(id, { email, name, photo })
  }

  getAll() {
    return this._base.getAll(this._projection)
  }

  getById(id) {
    return this._base.getById(id, this._projection)
  }

  delete(id) {
    return this._base.delete(id)
  }
}

module.exports = new UserRepository()
