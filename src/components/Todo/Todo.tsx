import * as React from "react";
import {useCallback, useEffect, useMemo, useState} from "react";
import {createTodo, deleteTodo, getTodosApi, updateTodo} from "../../utils/apis/todoApi";
import Button from "@mui/material/Button";
import TodoDialog from "./TodoDialog";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import TodoItems from "./TodoItems";
import TodoDetail from "./TodoDetail";
import {useNavigate, useParams} from "react-router-dom";
import {removeLocalStorage} from "../../utils/localStorages";
import {TodoType} from "../../utils/types";

const Todo = () => {

  let {action, todoId} = useParams();
  // isCreateTodo => isOpenTodoDialog 가 맞을거같다.
  const [isOpenTodoDialog, setIsOpenTodoDialog] = React.useState(false);

  const navigate = useNavigate();
  const [todos, setTodos] = useState<[TodoType]|[]>([]);

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


  const handleClickOpen = useCallback(() => {
    console.log('handle open!')
    setIsOpenTodoDialog(true);
  },[]);

  const handleClose = () => {
    console.log('handle close!')
    setIsOpenTodoDialog(false);
  };

  const handleClickCreate = (todo: any) => {
    createTodo(todo).then(r => {
      console.log(r)
      setIsOpenTodoDialog(false);
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

  const handleClickDelete = useCallback( (id: string) => {
    console.log('handleClickDelete', id)
    deleteTodo(id).then(r => {
      getTodos()
    })
  },[])

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {m: 1, width: '50ch'},
        }}
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
        <TodoDialog open={isOpenTodoDialog} handleClose={handleClose} handleClickCreate={handleClickCreate}
                    title="Add Todo"/>
        <div style={{display: 'flex', backgroundColor: '#12121'}}>
          <TodoItems todos={todos} handleClickDelete={handleClickDelete} selectTodoId={todoId}/>
        </div>
        {
          action && (
            <div style={{backgroundColor: '#12121'}}>
              <TodoDetail actionParam={action} handleClickEdit={handleClickEdit} selectTodoId={todoId}/>
            </div>
          )
        }

      </Box>
    </>
  )
}

export default Todo