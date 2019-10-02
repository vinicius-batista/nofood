const Repository = require('../repositories/product-repository')
const ControllerBase = require('../bin/base/controller-base')
const Validation = require('../bin/helpers/validation')

function get(req, res) {
  ControllerBase.get(Repository, req, res)
}

function post(req, res) {
  const validationContract = new Validation()
  validationContract.isRequired(
    req.body.name,
    'O nome do produto é obrigatorio'
  )
  validationContract.isRequired(
    req.body.description,
    'A descrição do produto é obrigatoria'
  )
  validationContract.isRequired(
    req.body.photo,
    'A foto do produto é obrigatoria'
  )
  validationContract.isRequired(
    req.body.price,
    'O preço do produto é obrigatorio'
  )

  if (req.body.price)
    validationContract.isTrue(
      req.body.price == 0,
      'O preço do produto deve ser maior que Zero.'
    )
  ControllerBase.post(Repository, validationContract, req, res)
}

function getById(req, res) {
  ControllerBase.getById(Repository, req, res)
}

function getByCategoryId(req, res) {
  if (!req.params.id) {
    res.status(400).send({ message: 'Id invalido!' })
    return
  }

  Repository.getByCategoryId(req.params.id)
    .then(ControllerBase.sendResult(res, 200))
    .catch(ControllerBase.sendResult(res, 400))
}

function put(req, res) {
  const validationContract = new Validation()

  validationContract.isRequired(
    req.body.name,
    'O nome do produto é obrigatorio'
  )
  validationContract.isRequired(
    req.body.description,
    'A descrição do produto é obrigatoria'
  )
  validationContract.isRequired(
    req.body.photo,
    'A foto do produto é obrigatoria'
  )
  validationContract.isRequired(
    req.body.price,
    'O preço do produto é obrigatorio'
  )

  if (req.body.price)
    validationContract.isTrue(
      req.body.price == 0,
      'O preço do produto deve ser maior que Zero.'
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
  getByCategoryId,
}
