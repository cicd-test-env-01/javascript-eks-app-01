const express = require('express')
const config = require('./config/config.json')
const app = express()
const db_user = config.get('server.db_user')
const db_password = config.get('server.db_password')

app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

console.log(`DB Credentials : ${db_user}:${db_password}`)
