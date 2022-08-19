import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import authValidation, {emailValidation, passwordValidation} from "../../utils/validationUtil";
import SendIcon from '@mui/icons-material/Send';
import {User} from "../../utils/types";
import {useInput} from "../../utils/hooks/useInput";
import {CustomHelperText} from "../etc/CustomHelperText";
import useSignIn from "../../utils/hooks/useSignIn";
import useSignUp from "../../utils/hooks/useSignUp";
import {CustomStoreContext} from "../../utils/customContext";
import {CustomSnackbarContext} from "../CustomSnackbar/CustomSnackbarContext";


type props = {
  path: string
}

export default function Login({path}: props) {

  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true)
  const navigate = useNavigate();

  const emailInput = useInput('', 'email', CustomHelperText, emailValidation);
  const passwordInput = useInput('', 'password', CustomHelperText, passwordValidation);

  const email = emailInput.options.value
  const password = passwordInput.options.value

  const signIn = useSignIn()
  const signUp = useSignUp()
  //test
  const context = useContext(CustomStoreContext)
  const snackbarContext = useContext(CustomSnackbarContext)
  const counter = context.getState()
  //
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

  const handleSignInClick = () => {
    signIn.mutate(user)
  }

  const handleSignUpClick = () => {
    signUp.mutate(user)
  }

  const renderAuthForm = () => {
    return (
      <>
        <div>
          <TextField
            required
            id="email"
            label="Email"
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
        <Button variant="contained" endIcon={<SendIcon/>} onClick={() => navigate(`/auth/${path === 'signin' ? "signup" : "signin"}`)}>
          {path === 'signin' ? "Sign Up" : "Sign In"}
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