import {CustomSnackbarContext} from "./CustomSnackbarContext"
import {useReducer, useState} from "react";


function snackbarReducer(state: unknown, action: { type: "ON" | "OFF", state: any }) {
  console.log(state)
  switch (action.type) {
    case "ON":
      return {open: true}
    case "OFF":
      return {open: false}
    default:
      throw new Error()
  }
}

const CustomSnackbarProvider = ({children}: any) => {
  const [open, setOpen] = useState(false)
  return (
    <CustomSnackbarContext.Provider value={{open, on:()=>setOpen(!open)}}>
      {children}
    </CustomSnackbarContext.Provider>
  )
}

export default CustomSnackbarProvider