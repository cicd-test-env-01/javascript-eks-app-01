const express = require('express')
const app = express()

var config = require('/config/config.json')
const db_user = config.get('database.db_user')
const db_password = config.get('database.db_password')

app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

console.log(`DB Credentials : ${db_user}:${db_password}`)
