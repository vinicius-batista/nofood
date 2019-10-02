const jwt = require('jsonwebtoken')
const { security } = require('../bin/config/variables')

module.exports = async (req, res, next) => {
  const token =
    req.body.token || req.query.query || req.headers['x-access-token']
  if (token) {
    try {
      const decoded = await jwt.verify(token, security.secretKey)
      req.userLogged = decoded
      next()
    } catch (error) {
      res.status(401).send({ message: 'Token informado é inválido' })
      return
    }
  } else {
    res.status(401).send({
      message: 'Você precisa informar um token para acessar esse recurso.',
    })
    return
  }
}
