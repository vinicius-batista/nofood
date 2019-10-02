const app = require('./bin/express')
const { api } = require('./bin/config/variables')

app.listen(api.port, () => {
  console.log(`iniciado na porta ${api.port}`)
})
