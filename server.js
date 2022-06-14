// Module
const express = require('express')
const config = require('config')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// Configuration from config.js
const val1 = config.get('Server.key1')
const val2 = config.get('Server.key2')

var AWS = require('aws-sdk')
var kms = new AWS.KMS()

var params = {
  CiphertextBlob:
    'lOpTFLT1V7JQpOS2EEsqNs7Mfys/aV6M55MOXYkFO321KzHlZxcWDgv1Ps5Ifo05P6XSnxNN0yzmoS46/10GSAz5GgoVFDHaSZmFDax5RTbXBVGvVpGtfFQg9UwEsiv4tWmK/CyVCp1yPo77kHdP3TIkblLEa5g/k3KC/rPTtGJYOYgO+70lbzrXl/WjdVRWoPciC5cu6lhZd4hmP8VcsMDIGmSvn66V2LA30by53z0Ne3ilRKJ0cI9ztDoYwUYRSHVzVlofSGBRIlF5wH78i4SKsNbTjY9cN9Ph/Coy9YtYQmz4Y9hu7msnt6jvsM+BD7RAVNOFUe7tdA4/VFQUx0WiJdieX26ys1Y9x5CU2pfdOr47SBZ+kS6evK5HoT/BsaCz7QxbOG2MxqC+UEF4f1u342eXqcAgrTmw3CIRZPEQhE5haQma0d7sHvnToRUI4KfUcEL/sDbL6pOfa+EVP4psUgGpBFCkiDzXvTS+OhprQV/m9uxbIL261jvqZIw9C9eeugQxEG0o7jjyMCElZIn4g2xX3n0WkWQfPPTkrS5ebQLLqcZ6JCQkJh7RZcC9XSUF8eGEL8Mff2LgpHsfj7VoCvefRSLxmFZwkL3gAca9OGKHezKMDKKMWllUKv7Ezl69uCyb+LjWfgkJP0C3M+4k3eefHYurKZbApkCuV0M=', // The encrypted data (ciphertext).
  KeyId:
    'arn:aws:kms:ap-northeast-2:521651615177:key/6ca496ce-938b-4038-af90-e1614da7535c', // A key identifier for the KMS key to use to decrypt the data.
}

kms.decrypt(params, function (err, data) {
  if (err) console.log(err, err.stack) // an error occurred
  else console.log(data) // successful response
  /*
   data = {
    KeyId: "arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab", // The Amazon Resource Name (ARN) of the KMS key that was used to decrypt the data.
    Plaintext: <Binary String>// The decrypted (plaintext) data.
   }
   */
})

// App
const app = express()
app.use(express.static(__dirname + '/static'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, HOST)
console.log(`Conf: ${val1} ${val2}, Running on http://${HOST}:${PORT}`)
