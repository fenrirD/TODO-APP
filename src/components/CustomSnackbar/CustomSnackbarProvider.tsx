import {CustomSnackbarContext} from "./CustomSnackbarContext"
import {useEffect, useMemo, useState} from "react";

const CustomSnackbarProvider = ({store, children}: any) => {
  const [open, setOpen] = useState(store.getState().open)

  useEffect(()=>{
    store.setListener(setOpen)
    return () => {
      store.resetListener()
    };
  },[store.getState.open])

  const contextValue = useMemo(() => {
    return {
      store,
    }
  }, [store])

  const previousState = useMemo(() => store.getState(), [store])

  useEffect(() => {
  }, [contextValue, previousState])

  return (
    <CustomSnackbarContext.Provider value={{...contextValue.store, open}}>
      {children}
    </CustomSnackbarContext.Provider>
  )
}

export default CustomSnackbarProvider