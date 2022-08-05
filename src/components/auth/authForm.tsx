import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

const renderTextField = () => {
  return (
    <div>
      <TextField
        required
        id="email"
        label="Required"
        variant="filled"
        autoFocus={true}
        fullWidth={true}
        // onChange={handleChange}
        // value={user.email}
      />
    </div>
  )
}

const AuthForm = (handleChange:any,user:any, handleSignInClick:any) => {

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
  )

}

export default AuthForm