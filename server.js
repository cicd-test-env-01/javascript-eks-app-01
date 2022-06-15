const express = require('express')
const PORT = 8080
const HOST = '0.0.0.0'

// External Config 샘플 (config.js)
const config = require('config')
const configTest = config.get('Server.testKey')

// AWS KMS Decrypt 샘플
const kmsKeyID = config.get('Server.kmsKeyID')
const dbUser = config.get('Server.dbUser')
const dbPassword = config.get('Server.dbPassword')

var AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-2' })
var kms = new AWS.KMS()

async function decrypt(source) {
  const params = {
    CiphertextBlob: Buffer.from(source, 'base64'),
    EncryptionAlgorithm: 'RSAES_OAEP_SHA_256',
    KeyId: kmsKeyID,
  }
  const { Plaintext } = await kms.decrypt(params).promise()
  return Plaintext.toString()
}

decrypt(dbUser).then((decoded) => console.log(decoded))
decrypt(dbPassword).then((decoded) => console.log(decoded))

// App
const app = express()
app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, HOST)
console.log(`Config: ${configTest}, Running on http://${HOST}:${PORT}`)
