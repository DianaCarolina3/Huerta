const photos = require('../components/photos/network')

const routes = (server) => {
  server.use('/photos', photos)
}

module.exports = routes
