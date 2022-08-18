import {useContext} from "react";
import {CustomSnackbarContext} from "../components/CustomSnackbar/CustomSnackbarContext";

export const useError = (err:any) => {

  const snackbarContext = useContext(CustomSnackbarContext)
  console.log(err,snackbarContext)
}