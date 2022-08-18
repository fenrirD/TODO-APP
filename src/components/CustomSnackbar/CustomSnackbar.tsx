import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, {useContext, useState} from "react";
import useInnerSnackbar from "./hooks/useInnerSnackbar";
import {CustomSnackbarContext} from "./CustomSnackbarContext";

const CustomSnackbar = () => {

  const snackbar = useContext(CustomSnackbarContext)
  const handleClose = () => {
    snackbar.on()
  }
  console.log('CustomSnackbar',snackbar)
  return (
    <Snackbar
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      open={snackbar.open}
      onClose={handleClose}
      message="I love snacks"
      autoHideDuration={3000}
      // key={vertical + horizontal}
    >
      <Alert severity="success" sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar>
  )
}


export default CustomSnackbar