const store = require('../../../database/postgresSQL')
const controller = require('./controller')

module.exports = controller(store)
