import useInnerSnackbar from "../../components/CustomSnackbar/hooks/useInnerSnackbar";

export default function useSnackbar() {
  const {handleClickOpen} = useInnerSnackbar()
  console.log('in useSnackbar ')
  return {
    on: handleClickOpen
  }
}