# 프로젝트 소개

프리온보딩 챌린지.

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

## week 1-1 리팩토링

### Login/ SignUp 리팩토링 과정
* 로그인/회원가입은 기능의 최소 조건으로 구현하였습니다.
* 로그인, 회원가입은 동일한 컴포넌트로 사용하고, Path에 따라서 구현을 하였습니다.
> [개발 최소 조건](https://github.com/fenrirD/wanted-pre-onboarding-challenge-fe-1-api#assignment-1---login--signup)을 확인해주세요.

#### `Login` 컴포넌트의 사전 과제 당시 코드

```typescript jsx
export default function Login({path}: LoginProps) {
  const [user, setUser] = useState({email: '', password: ''});
  // 무엇을 Enable 할까?
  const [isEnable, setIsEnable] = useState(true)
  const navigate = useNavigate();
  
  // 페이지 이동시 초기화 부분
  useEffect(() => {
    setUser({
      email: '', password: ''
    })
  }, [path])

  useEffect(() => {
    const {isEmail, isPassword} = authValidation(user);
    setIsEnable(!(isEmail && isPassword))
  }, [user])
  
  // Input의 change 이벤트
  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const handleSignInClick = () => {
    singIn(user).then(r => {
      setToken(user, r.data.token)
      navigate("/todos")
    });
  }
  
  return (
    //생략
      // 생략
    <>
      <div>
        <TextField
          required
          id="email"
          label="Required"
          variant="filled"
          autoFocus={true}
          fullWidth
          onChange={handleChange}
          value={user.email}
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          onChange={handleChange}
          value={user.password}
        />
      </div>
      <Button
        variant="contained"
        fullWidth={true}
        onClick={path === 'signin' ? handleSignInClick : handleSignUpClick}
        disabled={isEnable}
      >
        {path === 'signin' ? "Sign In" : "Sign Up"}
      </Button>
  </>
  );
}
```
#### 개선을 해보자
- `isEnable` 등 의 불명확한 변수명 -> 변수명만으로 의도를 드러내자.
- 뭔가 난잡한 코드 및 벨리데이션의 디테일 -> CustomHook을 통해 벨리데이션 등을 추상화 해보자.? 
- 에러에 대한 대응책이 1도없음 -> 추가 예정 

#### 리팩토링 
- 고려사항
  - email, password 두 인풋 모두 벨리데이션 기능이 필요하다고 생각이 들고, 인풋마다 벨리데이션을 주입받아서 추상화(?)하고자 했습니다.
  - 추가로 인풋 밑에 상태가 변화 될 때마다 벨리데이션에 부합되는지 헬퍼텍스트를 추가해주기로 생각했습니다.
  - `return` 으로는 `TextField` 컴포넌트에 필요한 옵션들과 로그인/회원가입 컴포넌트가 동일하므로 path가 변경될때 value를 초기화해주는 `reset`함수를 반환 해줍니다.
* `useInput.tsx` 생성
```typescript jsx
export const useInput = (initialValue:string, inputId:string, helper:Function, validator?:Function, ) => {

  const [value, setValue] = useState(initialValue)
  const targetId = inputId.toUpperCase()
  const [helperText, setHelperText] = useState<React.ReactNode>(HElPER_TEXT[targetId])


  const onChange = (event:any) => {

    const {value} = event.target
    let isValidate = false
    if(typeof validator === 'function') {
      isValidate = validator(value)
    }

    setHelperText(helper(HElPER_TEXT[targetId],isValidate))
    setValue(value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {options :{value, onChange, helperText}, reset}
}
```


- `Login` 컴포넌트
```typescript jsx
export default function Login({path}: LoginProps) {

  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true)
  const navigate = useNavigate();

  const emailInput = useInput('', 'email', CustomHelperText, emailValidation);
  const passwordInput = useInput('', 'password', CustomHelperText, passwordValidation);

  const email = emailInput.options.value
  const password = passwordInput.options.value

  const user: User = {
    email,
    password,
  }

  useEffect(() => {
    emailInput.reset()
    passwordInput.reset()
  }, [path])

  useEffect(() => {
    const {isEmail, isPassword} = authValidation(user);
    setIsSubmitButtonEnable(!(isEmail && isPassword))
  }, [email, password])

  const handleSignInClick = async () => {
    const res = await singIn(user)
    if (res) {
      setToken(user, res.data.token)
      navigate("/todos")
    } else {
      alert("error!")
    }
  }
  
  const renderAuthForm = () => {
    return (
      <>
        <div>
          <TextField
            required
            id="email"
            label="Required"
            variant="filled"
            placeholder="example@example.com"
            autoFocus={true}
            fullWidth
            {...emailInput.options}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            {...passwordInput.options}
          />
        </div>
      </>
    )
  }

  return (
    <>
      //생략
      {renderAuthForm()}
      <div>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={path === 'signin' ? handleSignInClick : handleSignUpClick}
          disabled={isSubmitButtonEnable}
        >
          {path === 'signin' ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </>
  );
}
```
---
리팩토링 할 부분이 많다.
# 부족한점 
* **전체적인 코드 리팩토링이 필요함.**
* 회원가입 및 투두 추가시에 상태 초기화 로직이 빠짐.
* 
