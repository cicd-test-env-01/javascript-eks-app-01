# π₯ Node(JS) μν μμ€

μ΄ μν μμ€λ 5/23 κ³΅μ§ λ λΈλμΉ λ° λ°°ν¬ μ λ΅ 2.0μ μ€μνλ Node.js μν μμ€ μλλ€.

λΈλμΉ λ° λ°°ν¬ μ λ΅ 2.0μ νμ΄νλΌμΈ / config μ£Όμ κ΅¬μ‘°κ° λ€μ΄κ°μμΌλ©°,  
μ΄ λμ κ΅¬μ‘°λ₯Ό λ³΄μ¬μ£ΌκΈ° μν λͺ©μ μΌλ‘ μ κ³΅λλ μμ€ μλλ€.  
(μ΄νλ¦¬μΌμ΄μ κ°λ° λ° μ΄μ, λ³΄μ κ°μ΄λ μ€μ λ±μ μν μ€μ  λ±μ λ³λλ‘ μννμμΌ ν©λλ€.)

μ°Έκ³ . [λΈλμΉ λ° λ°°ν¬ μ λ΅ 2.0(overview) λ°λ‘κ°κΈ°](https://lgu-cto.atlassian.net/wiki/spaces/CLOUDASSET/pages/37473818834/CTO+2.0)  
μ°Έκ³ . [νκ²½λ³ CI/CD μ μ°¨ κ°μ΄λ λ°λ‘κ°κΈ°](https://lgu-cto.atlassian.net/wiki/spaces/CLOUDASSET/pages/37473912656/3.+CI+CD)

λΈλμΉ λ° λ°°ν¬ μ λ΅ 2.0μ μ€μνκΈ° λλ¬Έμ,  
νκ²½λ³ κ° μλ²μμ μ¬μ©λλ config μ λ³΄λ νμ΄νλΌμΈ μ λΉλ μ΄ν μ£Όμλ©λλ€.

λ°λΌμ κ°λ°μ μν΄ μμ€λ₯Ό λ³κ²½νμλλΌλ,  
config μ£Όμ κ΅¬μ‘°λ κΌ­ λ°λΌμ£ΌμμΌλ§ λ°°ν¬ νμ΄νλΌμΈμ΄ μ μ λμν©λλ€.  
(μν μμ€λ΄μ μ΄λ―Έ μ μ λμ΄μκ³ , ν΄λΉ λ΄μ©μ μλμ κΈ°μ¬λμ΄ μμ΅λλ€.)

<p>&nbsp;</p>

## βοΈ Config κ° λ£κΈ°

### `Localμ© (λ΄ PC)`

'config' λλ ν λ¦¬ νλ¨μ default.jsonμ νμ Config μμ±

```json
{
  "Server": {
    "testKey": "local_test"
  }
}
```

### `μλ²μ© (κ°λ°, κ²μ, μμ©)(EKSνκ²½)`

github cfgstore repositoryμ aws-eks/{νκ²½(κ°λ°,κ²μ,μμ©)}-yaml/configmap.yaml λ΄ dataμ μλμ κ°μ΄ μμ±μ  
νμ΄νλΌμΈ κ³Όμ μμ κΈ°μ‘΄ config.js νμΌμ λ³κ²½ νμ¬, νκ²½μ λ§λ configκ°μ μ κ³΅νκ² λ©λλ€.

```yaml
 ...
data:
  app.properties: |-
    {
      "Server": {
        "testKey": "dev_test"
      }
    }

```

### `μλ²μ© (κ°λ°, κ²μ, μμ©)(EC2νκ²½)`

github cfgstore repositoryμ aws-codedeploy/{νκ²½(κ°λ°,κ²μ,μμ©)}-script/default.json νμΌ λ΄ μλμ κ°μ΄ μμ±μ  
νμ΄νλΌμΈ κ³Όμ μμ κΈ°μ‘΄ default.json νμΌμ λ³κ²½ νμ¬, νκ²½μ λ§λ configκ°μ μ κ³΅νκ² λ©λλ€.

```json
{
  "Server": {
    "testKey": "local_test"
  }
}
```

<p>&nbsp;</p>

## βοΈ Configμ λ―Όκ° μ λ³΄ μ¬μ©

DB ν¨μ€μλ λ± λ―Όκ°μ λ³΄μ ν΄λΉνλ Configλ λΈμΆμ λ°©μ§νκΈ° μν΄ default.json νμΌμ AWS KMSλ₯Ό ν΅ν΄ μνΈν λ κ°κ³Ό μνΈνμ μ¬μ©λ KMS ν€μ IDλ₯Ό μλ ₯

```json
 "kmsKeyID": "arn:aws:kms:ap-northeast-2:<Account ID>:key/<KMS ν€ ID>",
 "dbPassword": "KMoGVWQwXHQ1Vnk9ZbqNnGHAff9xy+aC/V2nTI7BgC5t8PSRtdUqS36iH4fxhrSfm6zjQX0YZC0phcAmFQWe84T85jbdHwL3uwXO/e6tqxUjVykR5tGB/WsI2SvHJmBBtrWT5HRy1kjlIojjPe/V4Xbk06ocEc8RJi1/f0pXRC/swmgPTPutu5PrnD0jWeZKbvuwL02TPVV3xN63sekNdK+tQ5IQtA2k5IuduBhxEh64Uz1nUfgxu2gXGBSm+VzcKUO6nLjIWjodLyfeTkG3rdaHGD5jxyCB1cUzWfvcczjKH/BRIQ4qxeYu/WJ2dg9HaIxPT/Ya6zCNCXyzWQ2UePbvUJZoHqLRwxGicwDG04hWLzmpWSaQk5BJVL3cT2E9bY8QxwUy6/b4qDuIsrhb8LiDRbtJzxIwUIk9qg+mZ8wkgTda3G1nDwG5ckr0XCt9dcyVcu4cp1eDmICdP2MjP6N5oVLRzgnqwHlIb6IbYdOrN1BZ/BQcxCgC4aqns/7rBANiokx28CFpgiLAf4mnzJh1X6ozYfF4DCcM3tXLZ1jIGzxqj7kqqxr6NPdRIqQtF1CpPjgFxA/hsJR0DqaCCZoAuizhdgDHsHgOZVjgqFd8ARLkGZRIwpYOdMEhE9kCI8kyJsdkPYM46Me2wSbExrf1aAU+zMzshq8MMk5aqoU="
```

KMSλ₯Ό ν΅ν μνΈν λ°©λ²μ AWS CLI λ° κΆνμ΄ μ€μ λ λ¨λ§/μλ²μμ λ€μκ³Ό κ°μ΄ μ»€λ§¨λλ₯Ό μ€ν

```groovy
aws kms encrypt --key-id <KMS ν€ ID> fileb://<(echo -n 'νμ€νΈ') --encryption-algorithm RSAES_OAEP_SHA_256 --region ap-northeast-2
```

Output

```json
{
  "EncryptionAlgorithm": "RSAES_OAEP_SHA_256",
  "KeyId": "arn:aws:kms:ap-northeast-2:<Account ID>:key/<KMS ν€ ID>",
  "CiphertextBlob": "<μνΈν κ°>"
}
```

### μνΈνλ κ°μ AWS SDKλ₯Ό ν΅ν΄ Decryptνμ¬ μ¬μ©

https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-kms/classes/decryptcommand.html

<p>&nbsp;</p>

## π§ μ°Έκ³ . External Config ν¨ν€μ§ μ¬μ©

```javascript
const config = require('config')
const configTest = config.get('Server.testKey')
```

NPM Package μ£Όμ : https://www.npmjs.com/package/config
