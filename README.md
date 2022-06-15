# 🖥 Node(JS) 샘플 소스

이 샘플 소스는 5/23 공지 된 브랜치 및 배포 전략 2.0을 준수하는 Node.js 샘플 소스 입니다.

브랜치 및 배포 전략 2.0의 파이프라인 / config 주입 구조가 들어가있으며,  
이 동작 구조를 보여주기 위한 목적으로 제공되는 소스 입니다.  
(어플리케이션 개발 및 운영, 보안 가이드 준수 등을 위한 설정 등은 별도로 수행하셔야 합니다.)

참고. [브랜치 및 배포 전략 2.0(overview) 바로가기](https://lgu-cto.atlassian.net/wiki/spaces/CLOUDASSET/pages/37473818834/CTO+2.0)  
참고. [환경별 CI/CD 절차 가이드 바로가기](https://lgu-cto.atlassian.net/wiki/spaces/CLOUDASSET/pages/37473912656/3.+CI+CD)

브랜치 및 배포 전략 2.0을 준수하기 떄문에,  
환경별 각 서버에서 사용되는 config 정보는 파이프라인 상 빌드 이후 주입됩니다.

따라서 개발을 위해 소스를 변경하시더라도,  
config 주입 구조는 꼭 따라주셔야만 배포 파이프라인이 정상 동작합니다.  
(샘플 소스내에 이미 정의 되어있고, 해당 내용은 아래에 기재되어 있습니다.)

<p>&nbsp;</p>

## ⚙️ Config 값 넣기

### `Local용 (내 PC)`

'config' 디렉토리 하단의 default.json에 필요 Config 작성

```json
{
  "Server": {
    "testKey": "local_test"
  }
}
```

### `서버용 (개발, 검수, 상용)(EKS환경)`

github cfgstore repository의 aws-eks/{환경(개발,검수,상용)}-yaml/configmap.yaml 내 data에 아래와 같이 작성시  
파이프라인 과정에서 기존 config.js 파일을 변경 하여, 환경에 맞는 config값을 제공하게 됩니다.

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

### `서버용 (개발, 검수, 상용)(EC2환경)`

github cfgstore repository의 aws-codedeploy/{환경(개발,검수,상용)}-script/default.json 파일 내 아래와 같이 작성시  
파이프라인 과정에서 기존 default.json 파일을 변경 하여, 환경에 맞는 config값을 제공하게 됩니다.

```json
{
  "Server": {
    "testKey": "local_test"
  }
}
```

<p>&nbsp;</p>

## ⚙️ Config에 민감 정보 사용

DB 패스워드 등 민감정보에 해당하는 Config는 노출을 방지하기 위해 default.json 파일에 AWS KMS를 통해 암호화 된 값과 암호화에 사용된 KMS 키의 ID를 입력

```json
 "kmsKeyID": "arn:aws:kms:ap-northeast-2:<Account ID>:key/<KMS 키 ID>",
 "dbPassword": "KMoGVWQwXHQ1Vnk9ZbqNnGHAff9xy+aC/V2nTI7BgC5t8PSRtdUqS36iH4fxhrSfm6zjQX0YZC0phcAmFQWe84T85jbdHwL3uwXO/e6tqxUjVykR5tGB/WsI2SvHJmBBtrWT5HRy1kjlIojjPe/V4Xbk06ocEc8RJi1/f0pXRC/swmgPTPutu5PrnD0jWeZKbvuwL02TPVV3xN63sekNdK+tQ5IQtA2k5IuduBhxEh64Uz1nUfgxu2gXGBSm+VzcKUO6nLjIWjodLyfeTkG3rdaHGD5jxyCB1cUzWfvcczjKH/BRIQ4qxeYu/WJ2dg9HaIxPT/Ya6zCNCXyzWQ2UePbvUJZoHqLRwxGicwDG04hWLzmpWSaQk5BJVL3cT2E9bY8QxwUy6/b4qDuIsrhb8LiDRbtJzxIwUIk9qg+mZ8wkgTda3G1nDwG5ckr0XCt9dcyVcu4cp1eDmICdP2MjP6N5oVLRzgnqwHlIb6IbYdOrN1BZ/BQcxCgC4aqns/7rBANiokx28CFpgiLAf4mnzJh1X6ozYfF4DCcM3tXLZ1jIGzxqj7kqqxr6NPdRIqQtF1CpPjgFxA/hsJR0DqaCCZoAuizhdgDHsHgOZVjgqFd8ARLkGZRIwpYOdMEhE9kCI8kyJsdkPYM46Me2wSbExrf1aAU+zMzshq8MMk5aqoU="
```

KMS를 통한 암호화 방법은 AWS CLI 및 권한이 설정된 단말/서버에서 다음과 같이 커맨드를 실행

```groovy
aws kms encrypt --key-id <KMS 키 ID> fileb://<(echo -n '텍스트') --encryption-algorithm RSAES_OAEP_SHA_256 --region ap-northeast-2
```

Output

```json
{
  "EncryptionAlgorithm": "RSAES_OAEP_SHA_256",
  "KeyId": "arn:aws:kms:ap-northeast-2:<Account ID>:key/<KMS 키 ID>",
  "CiphertextBlob": "<암호화 값>"
}
```

### 암호화된 값은 AWS SDK를 통해 Decrypt하여 사용

https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-kms/classes/decryptcommand.html

<p>&nbsp;</p>

## 🧐 참고. External Config 패키지 사용

```javascript
const config = require('config')
const configTest = config.get('Server.testKey')
```

NPM Package 주소 : https://www.npmjs.com/package/config
