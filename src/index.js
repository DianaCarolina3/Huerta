const express = require('express')

const path = require('path')

//app
const app = express()
//configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(path.join(__dirname)), 'public')

app.use('/', (req, res) => {
  res.redirect('/huerta')
})

const server = app.listen(3000, () => {
  console.log(`Listening on http://localhost:${server.address().port}`)
})
