const config = require('../../../config/')
const controller = require('./controller')
let store

if (config.dev !== 'production') {
  store = require('../../../database/firebase/service')
} else {
  store = require('../../../database/postgresSQL/service')
}

module.exports = controller(store)
