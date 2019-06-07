const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db
const port_number = process.env.PORT || 3000

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(port_number, () => {
    console.log(`Backend executando na porta ${port_number}`)
})