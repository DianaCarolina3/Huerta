const store = require('../../../database/postgresSQL/service')
const controller = require('./controller')

module.exports = controller(store)
