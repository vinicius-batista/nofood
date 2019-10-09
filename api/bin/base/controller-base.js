const sendResult = (res, status) => result => {
  console.log('resultado', result)
  res.status(status).send(result)
}

function get(repository, req, res) {
  repository
    .getAll()
    .then(sendResult(res, 200))
    .catch(sendResult(res, 400))
}

function post(repository, validationContract, req, res) {
  if (!validationContract.isValid()) {
    res
      .status(400)
      .send({
        message: 'Existem dados inválidos na sua requisição',
        validation: validationContract.errors(),
      })
      .end()
    return
  }

  repository
    .create(req.body)
    .then(sendResult(res, 201))
    .catch(err => {
      console.log(err)
      throw err
    })
    .catch(sendResult(res, 400))
}

function getById(repository, req, res) {
  if (!req.params.id) {
    res.status(400).send({ message: 'Id invalido!' })
    return
  }

  repository
    .getById(req.params.id)
    .then(sendResult(res, 200))
    .catch(sendResult(res, 400))
}

function put(repository, validationContract, req, res) {
  if (!validationContract.isValid()) {
    res
      .status(400)
      .send({
        message: 'Existem dados inválidos na sua requisição',
        validation: validationContract.errors(),
      })
      .end()
    return
  }

  repository
    .update(req.params.id, req.body)
    .then(sendResult(res, 202))
    .catch(sendResult(res, 400))
}

function destroy(repository, req, res) {
  if (!req.params.id) {
    res.status(400).send({ message: 'Id invalido!' })
    return
  }

  repository
    .delete(req.params.id)
    .then(sendResult(res, 204))
    .catch(sendResult(res, 400))
}

module.exports = {
  get,
  post,
  getById,
  put,
  destroy,
  sendResult,
}
