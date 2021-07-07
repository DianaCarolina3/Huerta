require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  pg: {
    host: process.env.HOST_PG,
    user: process.env.USER_PG,
    password: process.env.PASSWORD_PG,
    port: process.env.PORT_PG,
    database: process.env.DATABASE_PG,
  },
}
