// import logo from './logo.svg';
import './App.css';
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getToken} from "./utils/localStorages";
import React, {useContext, useEffect, useState} from "react";
import {HEADER_TITLE} from "./constants/constant";
import {Router} from "./router";
import {CustomStoreContext} from "./utils/customContext";
import useSnackbar from "./utils/hooks/useSnackbar";
import CustomSnackbar from "./components/CustomSnackbar/CustomSnackbar";
import {CustomSnackbarContext} from "./components/CustomSnackbar/CustomSnackbarContext";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const navigate = useNavigate()
  const location = useLocation();
  const [token, setToken] = useState<string>(getToken()?.token)
  const paths = location.pathname.split("/")
  const context = useContext(CustomStoreContext)
  const snackbarContext = useContext(CustomSnackbarContext)

  console.log('app', snackbarContext)
  const {on} = useSnackbar()
  console.log('app:',context, context.getState())

  // setTimeout(()=>on(),1000)
  useEffect(()=> {
    console.log('App component - effect')
    const r = token ? location.pathname : "/auth/signin"
    navigate(r==='/' ? '/todos' : r)
  },[])

  const lastPath:string = paths[paths.length - 1]

  const header:string = lastPath.length ? HEADER_TITLE[lastPath.toUpperCase()]: "Welcome to Todo App!"

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="App">
        <header className="App-header">
          <h1>{header || "Welcome to Todo App!"}</h1>
        </header>
        <div>
          <button onClick={()=>snackbarContext.on()}>버튼</button>
        </div>
        <div className="App-body">
          <Router path={lastPath}/>
        </div>
      </Box>
      <CustomSnackbar />
    </ThemeProvider>
  );
}

export default App;

