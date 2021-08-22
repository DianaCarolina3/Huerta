const express = require('express')

const router = require('./routes/router')
const config = require('./config')
const path = require('path')
const slash = require('express-slash')

//app-server
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//redirect
app.get('/', (req, res) => {
  res.redirect('/huerta')
})

//static files
app.use('/huerta', express.static(path.join(__dirname, 'public')))

//router
router(app)

//slash
app.use(slash())

//errors

//server
const server = app.listen(config.port, () => {
  console.log(`Listening to http://${config.host}:${server.address().port}`)
})
