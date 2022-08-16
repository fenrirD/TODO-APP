// import logo from './logo.svg';
import './App.css';
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getToken} from "./utils/localStorages";
import {useEffect, useState} from "react";
import {HEADER_TITLE} from "./constants/constant";
import {Router} from "./router";

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
        <div className="App-body">
          <Router path={lastPath}/>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;

