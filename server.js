// Constants
const express = require('express')
const config = require('config')

const DecryptCommand = require('@aws-sdk/client-kms')

const keyIds = [
  'arn:aws:kms:ap-northeast-2:521651615177:key/6ca496ce-938b-4038-af90-e1614da7535c',
]

const PORT = 8080
const HOST = '0.0.0.0'

const dbUser = config.get('Database.dbUser')
const dbPassword = config.get('Database.dbPassword')
const dbPasswordEncrypted = config.get('Database.dbPassword')

const decryptInput = {
  CiphertextBlob: dbPasswordEncrypted,
  EncryptionAlgorithm: 'RSAES_OAEP_SHA_256',
  KeyId: keyIds,
}

async function decrypt() {
  // const client = new KMSClient(config)
  const command = new DecryptCommand(decryptInput)
  const dbPasswordPlain = await client.send(command)

  alert(dbPasswordPlain)
}

const dbPasswordPlain = decrypt()

// App
const app = express()
app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, HOST)
console.log(
  `DB : ${dbUser} ${dbPassword} ${dbPasswordPlain} Running on http://${HOST}:${PORT}`
)
