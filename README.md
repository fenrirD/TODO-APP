# 프로젝트 소개

wanted에서 진행하는 프리온보딩 프로젝트.

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
    console.log('path effect =>',path)
    setUser({
      email: '', password: ''
    })
  }, [path])

  useEffect(() => {
    console.log('use Effect')
    const {isEmail, isPassword} = authValidation(user);
    setIsEnable(!(isEmail && isPassword))
  }, [user])
  // Input의 change 이벤트
  const handleChange = (e: any) => {
    console.log(e, "hande Change")
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const handleSignInClick = () => {
    console.log('handleSignInClick');

    singIn(user).then(r => {
      console.log(r, "then?")
      setToken(user, r.data.token)
      navigate("/todos")
    });
  }

  const handleSignUpClick = () => {
    console.log('handleSignUpClick')
    singUp(user).then(r => {
      console.log('result =>', r)
      navigate("/auth/signin")
    })
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '50ch'},
      }}
      autoComplete="off"
    >
      <Stack direction="row-reverse" spacing={2}>
        <Button variant="contained" endIcon={<SendIcon/>} onClick={() => navigate(`/auth/${path === 'signin' ? "signup" : "signin"}`)}>
          {path === 'signin' ? "Sign In" : "Sign Up"}
        </Button>
      </Stack>
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
      <div>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={path === 'signin' ? handleSignInClick : handleSignUpClick}
          disabled={isEnable}
        >
          {path === 'signin' ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </Box>
  );
}
```
#### 개선을 해보자
- `isEnable` 등 의 불명확한 변수명 -> 변수명만으로 의도를 드러내자.
- 뭔가 난잡한 코드 및 벨리데이션의 디테일 -> CustomHook을 통해 벨리데이션 등을 추상화 해보자.? 
- 에러에 대한 대응책이 1도없음 -> 추가 예정 

#### 수정
* `customHook.ts` 생성
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
- 고려사항
  - email, password 두 인풋 모두 벨리데이션 기능이 필요하다고 생각이 들고, 인풋마다 벨리데이션을 주입받아서 추상화(?)하고자 했습니다.
  - 추가로 인풋 밑에 상태가 변화 될 때마다 벨리데이션에 부합되는지 헬퍼텍스트를 추가해주기로 생각했습니다.
  - `return` 으로는 `TextField` 컴포넌트에 필요한 옵션들과 로그인/회원가입 컴포넌트가 동일하므로 path가 변경될때 value를 초기화해주는 `reset`함수를 반환 해줍니다

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

  const handleSignUpClick = () => {
    singUp(user).then(r => {
      console.log('result =>', r)
      navigate("/auth/signin")
    })
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
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '50ch'},
      }}
      autoComplete="off"
    >
      <Stack direction="row-reverse" spacing={2}>
        <Button variant="contained" endIcon={<SendIcon/>}
                onClick={() => navigate(`/auth/${path === 'signin' ? "signup" : "signin"}`)}>
          {path === 'signin' ? "Sign In" : "Sign Up"}
        </Button>
      </Stack>
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
    </Box>
  );
}
```
---
리팩토링 할 부분이 많다.
# 부족한점 
* **전체적인 코드 리팩토링이 필요함.**
* 회원가입 및 투두 추가시에 상태 초기화 로직이 빠짐.
* 
