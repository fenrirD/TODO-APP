import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {counter, counter2, customCreateStore} from "./utils/customRedux";
import {CustomStoreContext} from "./utils/customContext";
import CustomSnackbarProvider from "./components/CustomSnackbar/CustomSnackbarProvider";
import useSignIn from "./utils/hooks/useSignIn";
import {useError} from "./utils/snackbarHandler";


const root = ReactDOM.createRoot(document.getElementById('root')!);

const rootReducer = {
  counter,
  counter2
}

// const cRootReducer = combineReducers({
//   counter,
//   counter2,
// })

console.log(rootReducer)

const store = customCreateStore(rootReducer)
// const store = customCreateStore(counter)
store.subscribe(()=>{console.log('구독', store.getState())})
store.dispatch({type:'counter.INCREMENT',state:0})
store.dispatch({type:'counter.INCREMENT',state:0})
store.dispatch({type:'counter.INCREMENT',state:0})
store.dispatch({type:'counter2.INCREMENT',state:0})

// store.dispatch({type:'INCREMENT',state:0})
// store.dispatch({type:'INCREMENT',state:0})
// store.dispatch({type:'INCREMENT',state:0})

console.log(111111)
console.log(store.getState())


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 0,
      onError: useError
    },
    mutations: {
      onError: useError
    }
  },

});

root.render(
  <React.StrictMode>
    <CustomStoreContext.Provider value={store}>
      <CustomSnackbarProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
      </CustomSnackbarProvider>
    </CustomStoreContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
