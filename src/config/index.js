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
  firebase: {
    apikey: process.env.APIKEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    database_url: process.env.DATABASE_URL,
    storage_bucket: process.env.STORAGE_BUCKET,
    messaging_sender_id: process.env.MESSAGING_SENDER_ID,
    app_id: process.env.APP_ID,
    measurement_id: process.env.MEASUREMENT_ID,
  },
}
