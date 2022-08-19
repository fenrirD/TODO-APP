# 프로젝트 소개

프리온보딩 챌린지.

## 결과물
### 회원가입[/auth/siginup] /로그인[/auth/signin]
![signup](https://user-images.githubusercontent.com/54231096/185680049-141b608c-a4d4-4bc1-9b8f-9d19c63458a9.gif)

![Sigin](https://user-images.githubusercontent.com/54231096/185680008-1169fe7a-2156-4695-a487-558340008029.gif)
- 동일한 컴포넌트를 사용했으며, url을 구분하여 회원 가입과 로그인을 구현헀습니다.
- `useInput` 커스텀 훅을 사용하여 각 인풋마다 벨리데이션 체크를 실행합니다.

### TODO 생성 / 읽기 / 삭제 / 수정 / 
![add](https://user-images.githubusercontent.com/54231096/185679984-ee9217e7-4b01-47a2-af96-2512421f2e2c.gif)
- 생성은 모달을 활용하여 생성하였습니다.
- 읽기는 폼을 통하여 읽고, 수정 또한 같은 컴포넌트를 활용합니다.
- 뒤로가기 등을 통한 상태 유지는 url의 `TodoId` 값을 활용하여 유지합니다.

### 유효성 체크
![tokenRemove](https://user-images.githubusercontent.com/54231096/185680001-839c6e7d-ced3-4b6d-b33b-79e63ec3aeec.gif)
- Todo에 관한 요청은 모두 token 기반으루 이루어집니다. 그래서 매 요청마다 token이 유효한지 체크합니다. 


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

### Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [x] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

## 사용한 프레임워크

* packge.json

```json
{
  "dependencies": {
    "@emotion/react": "^11.10.0",
    "@emotion/styled": "^11.10.0",
    "@mui/icons-material": "^5.8.4",
    "@mui/material": "^5.9.3",
    "@reduxjs/toolkit": "^1.8.4",
    "@tanstack/react-query": "^4.1.3",
    "@tanstack/react-query-devtools": "^4.0.10",
    "axios": "^0.27.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-error-boundary": "^3.1.4",
    "react-redux": "^8.0.2",
    "react-router-dom": "6",
    "react-scripts": "5.0.1",
    "typescript": "^4.7.4",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^28.1.6",
    "@types/node": "^18.6.3",
    "@types/react": "^18.0.15",
    "@types/react-dom": "^18.0.6"
  }
}
```

| 프레임워크                | 버전    | 사용목적                     |
|----------------------|-------|--------------------------|
| mui/material         | 5.9.3 | 기본적인 UI 컴포넌트를 사용하기 위해서   |
| tanstack/react-query | 4.1.3 | 이번 챌린지의 과정중 하나 써보니 만족    |
| Axios                | 5.9.3 | 비동기 요청을 위해서 사용           |
| mui/material         | 5.9.3 | 기본적인 UI 컴포넌트를 사용하기 위해서   |
| typescript           | 4.7.4 | 생산성 향상을 위하여 사용하였으나 아직 미흡 |

## 폴더 구조
```
.
├── public
└── src
    ├── components
    │   ├── CustomSnackbar
    │   ├── Todo
    │   ├── auth
    │   └── etc
    ├── constants
    ├── router
    └── utils
        ├── apis
        ├── customContext
        ├── customRedux
        ├── hooks
        ├── store
        └── types
```
대규모 변경 예정입니다.

## 과제 진행시 주안점
* 사전과제
  - 일단 아무 생각없이 과제에 기능 구현만을 목표로 과제를 수행 했습니다. 그 증거로 모든 타입은 `any`를 남발하였습니다.
* 1 주차 - 1
  * 기본적으로 네이밍을 명확하게 짖는 편이라고 생각하였으나, 좀더 명확하고 직관적으로 짖기 위해 노력했습니다.
  * 최대한 타입에 대해 `any`를 제거하기 위해 노력했습니다.(그러나 아직 남아있다.)
* 1 주차 - 2 
  * 추상화에 대해 고민했습니다. 나름대로 `useInput` Hook을 추상화하여 구현했다고 생각합니다.
* 2 주차 - 1
  * React Query를 공부하고 Todo에 적용 해보았습니다.
  * Redux 구현 해보기를 수행하기 위해 나름 Redux 소스를 확인하고 분석했습니다.
* 2 주차 -2
  * 마무리로 Reademe를 작성해야 하는데..... Snackbar를 전역으로 만들기 위해 고민..
  
## 한계점
- ts에 대한 지식 혹은 경험이 더 필요하다고 생각된다. 앞으로 개발을 할때, 귀찮다고 혹은 잘 모른다고 `any`를 타입으로 지정하는것은 지양할 것
- 과제로 Redux를 구현하는 과제가 있었고, 그 Redux를 활용하여 상태 관리를 하고 싶었으나 생각보다 Redux의 Provider 등 다른 부분에 대한 이해도가 부족하다고 생각된다. 더욱 분석을 해야 할거 같다.
- 교육 내용중 `How`와 `What`에 대한 내용을 보고 고민했으나, 실제로 적용하기가 매우 까다로웠다. 이 챌린지가 끝나도 꾸준히 고민해봐야 할거 같다.
- 바쁘다는 핑계로 과제에 좀 집중하지 못 해서 아쉽다.
- React Query에 대해 좀 더 이해하고 제대로 사용하고 싶음.
- 이 Todo를 계속 리팩토링 할것!
 

