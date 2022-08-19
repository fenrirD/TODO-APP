import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import {Button, CardActions} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useInput} from "../../utils/hooks/useInput";
import useGetTodoById from "../../utils/hooks/useGetTodoById";


export default function TodoDetail({actionParam, handleClickEdit, selectTodoId}: any) {
  const isDisable = actionParam !== 'edit'
  const navigate = useNavigate();
  const [todo, setTodo] = useState({title: '', content: '', id: ''})


  const {status, data, error, isFetching} = useGetTodoById(selectTodoId)
  console.log('R=>', data, status)
  const titleInput = useInput(data?.data.data.title, 'title',)
  const contentInput = useInput(data?.data.data.content, 'content',)


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
              // value={todo.title}
              disabled={isDisable}

              // onChange={handleChange}
              {...titleInput.options}
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
              // value={todo.content}
              // onChange={handleChange}
              {...contentInput.options}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(`/todos/edit/${selectTodoId}`)}>Edit</Button>
          <Button size="small" disabled={isDisable} onClick={() => handleClickEdit({
            ...data?.data.data,
            title:titleInput.options.value,
            content:contentInput.options.value,
          })}>Submit</Button>
        </CardActions>
      </Card>
    </div>

  );
}
