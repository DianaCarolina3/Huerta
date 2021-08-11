//connection postgresSQL
const { Pool } = require('pg')

const config = require('../../../config')

const configDB = {
  host: config.pg.host,
  user: config.pg.user,
  password: config.pg.password,
  port: config.pg.port,
  database: config.pg.database,
}

const pool = new Pool(configDB)

//connection
function handleConnection() {
  //inicio connecion
  pool.connect((err) => {
    if (err) {
      console.log(['Error connection'], err)

      //conecta de nuevo en 2s
      setTimeout(handleConnection, 500)
    } else {
      console.log('Successfully connection to Postgres')
    }
  })

  //durante la connecion
  pool.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection()
    } else {
      throw err
    }
  })
}

handleConnection()

module.exports = pool
