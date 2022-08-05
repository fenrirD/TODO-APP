// import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import Login from "./components/auth/Login";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import {ThemeProvider, createTheme} from '@mui/material/styles';
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
  let location = useLocation();
  const [token, setToken] = useState(getToken()?.token)
  const paths = location.pathname.split("/")
  useEffect(()=>{
    const r = token ? location.pathname : "/auth/signin"
    console.log(token, r)
    navigate(r==='/' ? '/todos' : r)
  },[token])
  console.log('App - ', location.pathname.split("/"))

  const lastPath:string = paths[paths.length - 1]
  console.log(lastPath)
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

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}