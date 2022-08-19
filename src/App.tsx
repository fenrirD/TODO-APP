// import logo from './logo.svg';
import './App.css';
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getToken} from "./utils/localStorages";
import React, {useEffect, useState} from "react";
import {HEADER_TITLE} from "./constants/constant";
import {Router} from "./router";
import {CustomStoreContext} from "./utils/customContext";
import CustomSnackbar from "./components/CustomSnackbar/CustomSnackbar";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import {createSnackbar, snackbarReducer} from "./components/CustomSnackbar/customSnackbarReducer";
import {counter, counter2, customCreateStore} from "./utils/customRedux";
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import CustomSnackbarProvider from "./components/CustomSnackbar/CustomSnackbarProvider";
import {AxiosError, AxiosResponse} from "axios";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const rootReducer = {
  counter,
  counter2
}
const store = customCreateStore(rootReducer)

export const snackbar = createSnackbar(snackbarReducer)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 0,
      onError: () => {

      }
    },
    mutations: {
      onError: (error, variables, context) => {
        let msg
        if(error instanceof AxiosError){
          msg = error.response?.data.details
        }
        snackbar.dispatch({type: 'ON', payload:{severity:'warning', message:msg}})
      }
    }
  },
  queryCache: new QueryCache({
    // onError: () => useError
  })
});

function App() {
  const navigate = useNavigate()
  const location = useLocation();
  const [token, setToken] = useState<string>(getToken()?.token)
  const paths = location.pathname.split("/")


  useEffect(() => {
    const r = token ? location.pathname : "/auth/signin"
    navigate(r === '/' ? '/todos' : r)
  }, [])

  const lastPath: string = paths[paths.length - 1]

  const header: string = lastPath.length ? HEADER_TITLE[lastPath.toUpperCase()] : "Welcome to Todo App!"

  return (
    <CustomStoreContext.Provider value={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
        <CustomSnackbarProvider store={snackbar}>
          <ThemeProvider theme={darkTheme}>
            <Box className="App">
              <header className="App-header">
                <h1>{header || "Welcome to Todo App!"}</h1>
              </header>
              <div className="App-body">
                <Router path={lastPath}/>
              </div>
            </Box>
            <CustomSnackbar/>
          </ThemeProvider>
        </CustomSnackbarProvider>
      </QueryClientProvider>
    </CustomStoreContext.Provider>
  );
}

export default App;

