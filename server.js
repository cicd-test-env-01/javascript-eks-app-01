const express = require('express')
const config = require('config')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const dbUser = config.get('Dababase.dbUser')
const dbPassword = config.get('Dababase.dbPassword')

// App
const app = express()
app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, HOST)
console.log(`DB : ${dbUser} ${dbPassword} Running on http://${HOST}:${PORT}`)
