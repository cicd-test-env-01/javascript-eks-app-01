const express = require('express')
const config = require('config')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const db_user = config.get('server.db_user')
const db_password = config.get('server.db_password')

// App
const app = express()
app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, HOST)
console.log(`${db_user} ${db_password} Running on http://${HOST}:${PORT}`)
