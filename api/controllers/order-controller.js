const Repository = require('../repositories/order-repository')
const ControllerBase = require('../bin/base/controller-base')
const Validation = require('../bin/helpers/validation')

function get(req, res) {
  Repository.getAll(req.userLogged.user._id).then(
    ControllerBase.sendResult(res, 200)
  )
}

function post(req, res) {
  const validationContract = new Validation()
  ControllerBase.post(Repository, validationContract, req, res)
}

function getById(req, res) {
  ControllerBase.getById(Repository, req, res)
}

module.exports = {
  get,
  post,
  getById,
}
