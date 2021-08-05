const config = require('../../../config')
const controller = require('./controller')
let store

if (config.dev !== 'production') {
  store = require('../../../database/postgresSQL/service')
} else {
  store = require('../../../database/firebase/service')
}

module.exports = controller(store)
