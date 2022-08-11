import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {singIn, singUp} from "../../utils/apis/authApi";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../utils/localStorages";
import authValidation, {emailValidation, passwordValidation} from "../../utils/validationUtil";
import SendIcon from '@mui/icons-material/Send';
import {User} from "../../utils/types";
import {useInput} from "../../utils/customHook";
import {CustomHelperText} from "../input/CustomHelperText";


type LoginProps = {
  path: string
}

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