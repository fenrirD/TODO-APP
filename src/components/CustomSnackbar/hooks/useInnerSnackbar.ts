import {useState} from "react";

export default function useInnerSnackbar(){
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    console.log('useInnerSnackbar', open)
    setOpen(!open)
  }

  return {
    open,
    handleClickOpen
  }
}