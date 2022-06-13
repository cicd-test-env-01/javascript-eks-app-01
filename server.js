const express = require('express')
var config = require('./config/config.json')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const db_user = config.get(db_user)
const db_user = config.get(db_password)

// App
const app = express()
app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
