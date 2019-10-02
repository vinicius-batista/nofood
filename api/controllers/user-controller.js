const Repository = require('../repositories/user-repository')
const ControllerBase = require('../bin/base/controller-base')
const Validation = require('../bin/helpers/validation')
const jwt = require('jsonwebtoken')
const variables = require('../bin/config/variables')

function get(req, res) {
  ControllerBase.get(Repository, req, res)
}

async function authenticate(req, res) {
  const validationContract = new Validation()
  validationContract.isRequired(req.body.email, 'Informe seu e-mail')
  validationContract.isEmail(req.body.email, 'E-mail informado é inválido')
  validationContract.isRequired(req.body.password, 'Informe sua senha')

  if (!validationContract.isValid()) {
    res.status(400).send({
      message: 'Não foi possível efetuar o login',
      validation: validationContract.errors(),
    })
    return
  }
  const user = await Repository.authenticate(req.body.email, req.body.password)
  if (user) {
    res.status(200).send({
      user,
      token: jwt.sign({ user }, variables.security.secretKey),
    })
  } else {
    res.status(404).send({ message: 'Usuário e senha informado são inválido!' })
  }
}

async function post(req, res) {
  const validationContract = new Validation()

  validationContract.isRequired(req.body.name, 'Informe seu nome')
  validationContract.isRequired(req.body.email, 'Informe seu e-mail')
  validationContract.isEmail(req.body.email, 'O e-mail informado é inválido')
  validationContract.isRequired(
    req.body.password,
    'A senha informada é obrigatória'
  )
  validationContract.isRequired(
    req.body.passwordConfirm,
    'A senha de confirmação é obrigatória'
  )
  validationContract.isTrue(
    req.body.password !== req.body.passwordConfirm,
    'A Senha e a Confirmação não são iguais'
  )

  const isUserRegistred = await Repository.isEmailRegistred(req.body.email)

  validationContract.isTrue(
    isUserRegistred,
    `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`
  )

  ControllerBase.post(Repository, validationContract, req, res)
}

function getById(req, res) {
  ControllerBase.getById(Repository, req, res)
}

async function put(req, res) {
  const validationContract = new Validation()

  validationContract.isRequired(req.body.name, 'Informe seu nome')
  validationContract.isRequired(req.body.email, 'Informe seu e-mail')
  validationContract.isEmail(req.body.email, 'O e-mail informado é inválido')
  validationContract.isRequired(
    req.params.id,
    'Informe oId do usuário que será editado'
  )

  const isUserRegistred = await Repository.isEmailRegistred(req.body.email)

  validationContract.isTrue(
    isUserRegistred,
    `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`
  )

  ControllerBase.put(Repository, validationContract, req, res)
}

function destroy(req, res) {
  ControllerBase.destroy(Repository, req, res)
}

module.exports = {
  get,
  authenticate,
  post,
  getById,
  put,
  destroy,
}
