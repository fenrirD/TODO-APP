# 프로젝트 소개

프리온보딩 챌린지.

## 결과물

### 과제 1) README 작성 및 코드 정리

- [x]  최종 구현 화면 이미지 / 동영상으로 제공
  - 화면을 어떤 구조로 구성했는지에 대한 설명
  - 라우트나 기능별로 구분하여 제공하면 좋습니다 👍
- [ ]  설치, 환경설정 및 실행 방법
  - 프로젝트 실행 시 필요한 환경 세팅 확인 (script, port, env, …)
- [ ]  구현 요구 사항 목록
  - 체크 리스트 형태로 추가
- [ ]  사용한 프레임워크 및 라이브러리 설명
  - package.json 참조하여 선택한 이유 작성
- [ ]  폴더 구조 설명
  - 폴더를 구분한 기준에 대하여 설명
  - tree 명령어를 사용하면 간편하게 디렉토리 구조를 출력할 수 있음
- [ ]  과제 진행 시 주안점 작성
  - 고민한 부분에 대하여 서술
- [ ]  한계점 및 개선 사항 작성
  - 고려는 하였으나 실제 구현하지 못한 부분에 대하여 서술

## 소개
원티드에서 진행한 프리온보딩 챌린지로 약 2주간 TODO ㄱ
## 설치

### ✔ Requirements
- node
- yarn

> [Node 설치 페이지](https://nodejs.org/ko/) \
> [Yarn 설치 페이지](https://yarnpkg.com/getting-started/install)
> 
### Front
```shell
$ git clone https://github.com/fenrirD/wanted-pre-onboarding-challenge-fe-1.git

$ cd ./wanted-pre-onboarding-challenge-fe-1

$ yarn 

$ yanr start # http://localhost:3000
```
### Api Server

```shell
$ git clone https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api.git

$ cd ./wanted-pre-onboarding-challenge-fe-1-api

$ yarn 

$ yanr start # http://localhost:8080
```

## 구현 요구 사항

### Common
- [x] TanStack Query(React Query) 사용
- [x] Typescript 사용

### Assignment 1 - Login / SignUp
- [x] /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- [x] 이메일과 비밀번호의 유효성을 확인합니
  - [x] 이메일 조건 : 최소 @, . 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- [x] 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요
  - 
### Assignment 2 - Todo List

## 사용한 프레임워크

## 폴더 구조

## 과제 진행시 주안점

## 한계점

