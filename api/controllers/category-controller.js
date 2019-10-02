const Repository = require('../repositories/category-repository')
const ControllerBase = require('../bin/base/controller-base')
const Validation = require('../bin/helpers/validation')

function get(req, res) {
  ControllerBase.get(Repository, req, res)
}

function post(req, res) {
  const validationContract = new Validation()
  validationContract.isRequired(req.body.title, 'o título é obrigatório')
  validationContract.isRequired(req.body.photo, 'A foto é obrigatória')
  ControllerBase.post(Repository, validationContract, req, res)
}

function getById(req, res) {
  ControllerBase.getById(Repository, req, res)
}

function put(req, res) {
  const validationContract = new Validation()

  validationContract.isRequired(req.body.title, 'o título é obrigatório')
  validationContract.isRequired(req.body.photo, 'A foto é obrigatória')
  validationContract.isRequired(
    req.params.id,
    'O Id que será atualizado é obrigatório'
  )
  ControllerBase.put(Repository, validationContract, req, res)
}

function destroy(req, res) {
  ControllerBase.destroy(Repository, req, res)
}

module.exports = {
  get,
  post,
  getById,
  put,
  destroy,
}
