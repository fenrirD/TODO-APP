import {useEffect, useState} from "react";
import * as React from 'react';
import {createTodo, deleteTodo, getTodoById, getTodosApi, updateTodo} from "../../utils/apis/todoApi";
import Button from "@mui/material/Button";
import TodoDialog from "./TodoDialog";
import Box from "@mui/material/Box";
import {Container, Stack} from "@mui/material";
import TodoItems from "./TodoItems";
import TodoDetail from "./TodoDetail";
import {useNavigate, useParams} from "react-router-dom";
import {removeLocalStorage} from "../../utils/localStorages";

const Todo = () => {
  let {action, id}: any = useParams();
  const [isCreateTodo, setIsCreateTodo] = React.useState(false);

  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  console.log(id, action, 'param?')
  // @ts-ignore
  const handleClickLogout = () => {
    removeLocalStorage()
    navigate("/auth/signin")
  }
  const getTodos = () => {
    getTodosApi().then(r => {
      console.log('getTodos')
      setTodos(r.data.data)
    })
  }

  useEffect(() => {
    getTodos()
  }, [])


  const handleClickOpen = () => {
    setIsCreateTodo(true);
  };

  const handleClose = () => {
    setIsCreateTodo(false);
  };

  const handleClickCreate = (todo: any) => {
    createTodo(todo).then(r => {
      console.log(r)
      setIsCreateTodo(false);
      getTodos()
    })
  }
  const handleClickEdit = (todo: any) => {

    console.log('handleClickEdit', todo)
    updateTodo(todo).then(r => {
      console.log(r)
      getTodos()
      navigate('/todos')
    })
  }

  const handleClickDelete = (id: string) => {
    console.log('handleClickDelete', id)
    deleteTodo(id).then(r => {
      getTodos()
    })
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {m: 1, width: '50ch'},
        }}
        // noValidate
        autoComplete="off"
      >
        <Stack direction="row-reverse" spacing={2}>
          <Button onClick={handleClickLogout}>
            logout
          </Button>
        </Stack>
        <Stack direction="row-reverse" spacing={2}>
          <Button  onClick={handleClickOpen}>
            Add Data
          </Button>
        </Stack>
        <TodoDialog open={isCreateTodo} handleClose={handleClose} handleClickCreate={handleClickCreate}
                    title="Add Todo"/>
        <div style={{display: 'flex', backgroundColor: '#12121'}}>
          <TodoItems todos={todos} handleClickDelete={handleClickDelete} selectTodoId={id}/>
        </div>
        {
          action && (
            <div style={{backgroundColor: '#12121'}}>
              <TodoDetail actionParam={action} handleClickEdit={handleClickEdit} selectTodoId={id}/>
            </div>
          )
        }

      </Box>
    </>
  )
}

export default Todo