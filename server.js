const express = require('express')

// External Config 샘플 (config.js)
const config = require('config')
const configTest = config.get('Server.testKey')

// AWS KMS Decrypt 샘플
const kmsKeyID = config.get('Server.kmsKeyID')
const dbUser = config.get('Server.dbUser')
const dbPassword = config.get('Server.dbPassword')

const { KMSClient, DecryptCommand } = require('@aws-sdk/client-kms')
const client = new KMSClient({ region: 'ap-northeast-2' })

async function decrypt(source) {
  const params = {
    CiphertextBlob: Buffer.from(source, 'base64'),
    EncryptionAlgorithm: 'RSAES_OAEP_SHA_256',
    KeyId: kmsKeyID,
  }
  const command = new DecryptCommand(params)
  const { Plaintext } = await client.send(command)
  return Buffer.from(Plaintext).toString('utf-8')
}

decrypt(dbUser).then((decoded) => console.log(decoded))
decrypt(dbPassword).then((decoded) => console.log(decoded))

// 샘플 App
const app = express()
const PORT = 8080
const HOST = '0.0.0.0'

app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, HOST)
console.log(`Config: ${configTest}, Running on http://${HOST}:${PORT}`)
