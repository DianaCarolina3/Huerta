const store = require('../../database/dummydb')
const controller = require('./controller')

module.exports = controller(store)
