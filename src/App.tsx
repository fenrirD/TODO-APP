// import logo from './logo.svg';
import './App.css';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "./components/auth/Login";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getToken} from "./utils/localStorages";
import {useEffect, useState} from "react";
import {HEADER_TITLE} from "./constants/constant";
import Todo from "./components/Todo/Todo";

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
          <Routes>
            <Route path="auth">
              <Route path="signin" element={<Login path={lastPath}/>} />
              <Route path="signup" element={<Login path={lastPath}/>} />
            </Route>
            <Route path="todos" element={<Todo/>}/>
            <Route path="todos/:action/:id" element={<Todo/>}/>
          </Routes>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;

