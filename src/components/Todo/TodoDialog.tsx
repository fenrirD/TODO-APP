import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import {getTodoById} from "../../utils/apis/todoApi";

const TodoDialog = ({open, handleClose, handleClickCreate, title, selectedTodo}: any) => {
  console.log(selectedTodo, 'TodoDialog')
  const [todo, setTodo] = useState({title:'', content:''})

  useEffect(()=>{
    console.log('use eff')
    handleClickDetail(selectedTodo)
  },[])

  const handleClickDetail = (id:string) => {
    console.log(id)
    if(id) {
      getTodoById(id).then(r=> {
        console.log('handleClickDetail', r)
        const data = r.data.data
        setTodo({
          ...data,
        })
      })
    }

  }

  const handleChange = (e: any) => {
    console.log(e, "hande Change")
    setTodo({
      ...todo,
      [e.target.id] : e.target.value
    })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title"
            fullWidth
            variant="standard"
            value={todo.title}
            onChange={handleChange}
          />
          <TextField
            id="content"
            label="content"
            multiline
            rows={5}
            fullWidth
            margin="dense"
            value={todo.content}
            onChange={handleChange}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleClickCreate(todo)}>create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TodoDialog