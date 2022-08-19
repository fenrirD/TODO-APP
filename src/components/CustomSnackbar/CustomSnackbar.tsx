import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, {useContext} from "react";
import {CustomSnackbarContext} from "./CustomSnackbarContext";

const CustomSnackbar = () => {

  const snackbar = useContext(CustomSnackbarContext)

  const handleClose = () => {
    snackbar.dispatch({type:'OFF'})
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      open={snackbar.getState().open}
      onClose={handleClose}
      autoHideDuration={3000}
      // key={vertical + horizontal
    >
      <Alert severity={snackbar.getState().severity} sx={{ width: '100%' }}>
        {snackbar.getState().message}
      </Alert>
    </Snackbar>
  )
}


export default CustomSnackbar