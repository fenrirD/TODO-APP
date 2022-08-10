import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {singIn, singUp} from "../../utils/apis/authApi";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../utils/localStorages";
import authValidation from "../../utils/validationUtil";
import SendIcon from '@mui/icons-material/Send';
import {User} from "../../utils/types";


type LoginProps = {
  path: string
}

const initialUserState:User = {
  email: '',
  password: ''
}

export default function Login({path}: LoginProps) {

  const [user, setUser] = useState<User>(initialUserState);

  const [isEnable, setIsEnable] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    console.log('path effect =>',path)
    setUser(initialUserState)
  }, [path])

  useEffect(() => {
    console.log('use Effect')
    const {isEmail, isPassword} = authValidation(user);
    setIsEnable(!(isEmail && isPassword))
  }, [user])

  const handleInputChange = (e: any) => {
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
          placeholder="example@example.com"
          autoFocus={true}
          fullWidth
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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