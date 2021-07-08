const vegetable_plot = require('../api/components/vegetable_plot/network')
const vegetable = require('../api/components/vegetable/network')
// const photo = require('../components/photo/network')
// const compost = require('../components/compost/network')

const API = '/huerta'

const routes = (server) => {
  server.use(`${API}/vegetable_plot`, vegetable_plot)
  server.use(`${API}/vegetable`, vegetable)
  // server.use('/photo', photo)
  // server.use('/compost', compost)
}

module.exports = routes
