import {useEffect} from "react";
import * as React from 'react';
import {createTodo, todos} from "../../utils/apis/todoApi";
import Button from "@mui/material/Button";
import TodoDialog from "./TodoDialog";

const Todos = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCreate = (todo:any) => {
    createTodo(todo).then(r=>{
      console.log(r)
      setOpen(false);
    })
  }

  useEffect(()=>{
    todos().then(r=>{
      console.log(r)
    })
  })

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <TodoDialog open={open} handleClose={handleClose} handleClickCreate={handleClickCreate}/>
    </>
  )
}

export default Todos