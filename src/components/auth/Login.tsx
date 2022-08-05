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

export default function Login({path}:any) {

  const [user, setUser] = useState({email:'', password:''});
  // const [validation, setValidation] = useState({isEmail:true, isPassword:true})
  const [isEnable, setIsEnable] = useState(true)
  const navigate = useNavigate();
  console.log(path)
  useEffect(()=>{
    console.log('use Effect')
    const {isEmail, isPassword} = authValidation(user);
    setIsEnable(!(isEmail && isPassword))
  },[user])

  const handleChange = (e: any) => {
    console.log(e, "hande Change")
    setUser({
      ...user,
      [e.target.id] : e.target.value
    })
  }

   const handleSignInClick = () => {
    console.log('handleSignInClick');

    singIn(user).then(r=>{
      console.log(r,"then?")
      setToken(user, r.data.token)
      navigate("/todos")
    });
  }

  const handleSignUpClick = () => {
    console.log('handleSignUpClick')
    singUp(user).then( r => {
      console.log('result =>',r)
      navigate("/auth/signin")
    })
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '50ch'},
      }}
      // noValidate
      autoComplete="off"
    >
      <Stack direction="row-reverse" spacing={2}>
        <Button variant="contained" endIcon={<SendIcon />} onClick={()=>navigate('/auth/signup')}>
          SignUp
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
      <div >
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