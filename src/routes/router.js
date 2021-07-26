const vegetable_plot = require('../api/components/vegetable_plot/network')
const vegetable = require('../api/components/vegetable/network')
const vegetable_data = require('../api/components/vegetable_data/network')
const vegetable_info = require('../api/components/vegetable_info/network')
// const photo = require('../components/photo/network')
// const compost = require('../components/compost/network')

const API = '/huerta'

const routes = (server) => {
  server.use(`${API}/vegetable_plot`, vegetable_plot)
  server.use(`${API}/v`, vegetable)
  server.use(`${API}/vegetable_data`, vegetable_data)
  server.use(`${API}/vegetable_info`, vegetable_info)
  // server.use(`${API}/v_place`, vegetable_place)
  // server.use(`${API}/v_plague`, vegetable_plague)
  // server.use('/photo', photo)
  // server.use('/compost', compost)
}

module.exports = routes
