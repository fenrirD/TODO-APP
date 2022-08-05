import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import {Button, CardActions} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTodoById} from "../../utils/apis/todoApi";


export default function TodoDetail({actionParam, handleClickEdit, selectTodoId}: any) {
  const isDisable = actionParam !== 'edit'
  const navigate = useNavigate();
  const [todo, setTodo] = useState({title: '', content: '', id: ''})

  useEffect(() => {
    getTodoById(selectTodoId).then(r => {
      const result = r.data.data
      setTodo({
        title: result.title,
        content: result.content,
        id: result.id
      })
    })
  }, [selectTodoId])

  const handleChange = (e: any) => {
    setTodo({
      ...todo,
      [e.target.id]: e.target.value
    })
  }
  return (
    <div>
      <h2>Todo Detail</h2>
      <Card sx={{minWidth: 275}}>
        <CardContent>
          <div>
            <TextField
              margin="dense"
              id="title"
              label="title"
              fullWidth
              variant="standard"
              value={todo.title}
              disabled={isDisable}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="content"
              label="content"
              multiline
              rows={5}
              fullWidth
              margin="dense"
              disabled={isDisable}
              value={todo.content}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(`/todos/edit/${selectTodoId}`)}>Edit</Button>
          <Button size="small" disabled={isDisable} onClick={() => handleClickEdit(todo)}>Submit</Button>
        </CardActions>
      </Card>
    </div>

  );
}
