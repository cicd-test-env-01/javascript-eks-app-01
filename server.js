// Module
const express = require('express')
const config = require('config')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const val1 = config.get('Server.key1')
const val2 = config.get('Server.key2')

// App
const app = express()
app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, HOST)
console.log(`Conf: ${val1} ${val2}, Running on http://${HOST}:${PORT}`)
