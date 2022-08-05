import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {singIn} from "../../utils/apis/api";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../utils/localStorages";

export default function Login() {

  console.log(1)

  const [user, setUser] = useState({email:'test@test.com', password:'testtest'});
  const navigate = useNavigate();

  useEffect(()=>{
    console.log('use Effect')
  },[user])

  const handleChange = (e: any) => {
    console.log(e, "hande Change")
    setUser({
      ...user,
      [e.target.id] : e.target.value
    })
  }

   const handleSignInClick = () => {
    console.log('handleSignInClick')
    singIn(user).then(r=>{
      console.log(r,"then?")
      setToken(user, r.data.token)
      navigate("/todo")
    });

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
      <div>
        <TextField
          required
          id="email"
          label="Required"
          variant="filled"
          autoFocus={true}
          fullWidth={true}
          onChange={handleChange}
          value={user.email}
        />
      </div>
      <div>
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          onChange={handleChange}
        />
      </div>
      <div>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={handleSignInClick}
          >
            Sign In
          </Button>
      </div>

      <div>
        <Button
          variant="contained"
          fullWidth={true}
        >Sign Up</Button>
      </div>
    </Box>
  );
}