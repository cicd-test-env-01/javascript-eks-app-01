# NodeJS 샘플 소스(with Config management ) 및 CI/CD 파이프라인 템플릿 

#
## 1. 목적
- 빠른 개발 및 빌드/배포에 필요한 기본 환경을 제공
  <br/><br/>

## 2. 제공된 템플릿 정보
### 2.1. 샘플 소스 코드 Repository
- CI/CD 파이프라인 검증을 위한 샘플 코드
  <br/>

> 기본적진 개발 틀을 제공하기 위한 샘플이며, Node 버전, 빌드 버전, Configuration 구조 등 요구사항에 맞게 수정 후 개발 필요

<br/>

### 2.2. Configuration Repository
- <소스코드>-cfgstore 이름의 Repository
- K8S 배포를 위한 샘플 Manifests (yaml) 파일 또는 EC2 배포를 위한 샘플 CodeDeploy 파일
- CTO의 표준 브랜치 및 배포 전략에 준하는 빌드/배포 GitHub Actions Workflow (파이프라인)
  <br/>

> 샘플 앱에 준하는 기본 Config만 제공 되며, 실제 필요 Config에 맞게 수정 후 배포 필요
<br/>

<br/>

### 2.3. CI/CD 파이프라인
- GitHub Actions를 사용한 자동 빌드 및 배포가 가능한 CI/CD 파이프라인 제공
  - CI 파이프라인은 소스코드 Repository에, CD 파이프라인은 Configuration Repository에 위치
- CTO의 표준 브랜치 및 배포 전략에 준하는 빌드/배포 GitHub Actions Workflow (파이프라인)
  <br/><br/>

## 3. 상세 가이드
| # |구분                    | 상세 가이드 |
|---|-----------------------|----|
| 1 |CTO 브랜치 및 배포 전략 2.0    |https://lgu-cto.atlassian.net/wiki/spaces/CLOUDASSET/pages/37473818834/CTO+2.0|
| 2 |환경 별 빌드 및 배포 가이드     |https://lgu-cto.atlassian.net/wiki/spaces/CLOUDASSET/pages/37473912656|
| 3 |CI/CD 파이프라인 상세 설명     |https://lgu-cto.atlassian.net/wiki/spaces/CLOUDASSET/pages/37473912120/2.1+APP+CI+CD+Repository|
