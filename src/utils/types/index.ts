// TypeScript

import {ModalProps} from "@mui/material/Modal";
import {MouseEventHandler} from "react";

export type User = {
  email: string,
  password: string
}

export type TodoType = {
  title: string,
  content: string,
  id: string
}

interface T {
}

export type TodoDialogProps = {
  open: boolean,
  handleClose: MouseEventHandler<T>,
  handleClickCreate: Function,
  title: string,
  // selectedTodo: string
}

