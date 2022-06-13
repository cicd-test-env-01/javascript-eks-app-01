const { KMSClient, DecryptCommand } = require('@aws-sdk/client-kms')

// Constants
const express = require('express')
const config = require('config')

const keyIds = [
  'arn:aws:kms:ap-northeast-2:521651615177:key/6ca496ce-938b-4038-af90-e1614da7535c',
]
const keyring = new KmsKeyringNode({ generatorKeyId, keyIds })

const PORT = 8080
const HOST = '0.0.0.0'

const dbUser = config.get('Database.dbUser')
const dbPassword = config.get('Database.dbPassword')
const dbPasswordEncrypt = config.get('Database.dbPassword')

// const client = new KMSClient(config)
const command = new DecryptCommand(dbPasswordEncrypt)
const dbPasswordPlain = await client.send(command)

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
