import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TodoDialogProps} from "../../utils/types";
import {useInput} from "../../utils/hooks/useInput";

const TodoDialog = ({open, handleClose, handleClickCreate, title}: TodoDialogProps) => {

  // const [todo, setTodo] = useState({title: '', content: ''})

  const titleInput = useInput('', 'title',)
  const contentInput = useInput('', 'title',)

  const todo = useMemo(()=>({
    title:titleInput.options.value,
    content:contentInput.options.value
  }),[titleInput.options.value, contentInput.options.value])


  useEffect(() => {
    titleInput.reset()
    contentInput.reset()
  }, [open])

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
            {...titleInput.options}
          />
          <TextField
            id="content"
            label="content"
            multiline
            rows={5}
            fullWidth
            margin="dense"
            {...contentInput.options}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleClickCreate(todo)}>create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TodoDialog