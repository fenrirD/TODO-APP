import * as React from "react";
import {Suspense, useCallback, useEffect} from "react";
import {deleteTodo, updateTodo} from "../../utils/apis/todoApi";
import Button from "@mui/material/Button";
import TodoDialog from "./TodoDialog";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import TodoItems from "./TodoItems";
import TodoDetail from "./TodoDetail";
import {useNavigate, useParams} from "react-router-dom";
import {removeLocalStorage} from "../../utils/localStorages";
import useGetTodos from "../../utils/hooks/useGetTodos";
import usePostTodo from "../../utils/hooks/usePostTodo";
import {ErrorBoundary} from "react-error-boundary";
import useDeleteTodo from "../../utils/hooks/useDeleteTodo";
import usePutTodo from "../../utils/hooks/usePutTodo";


const Todo = () => {

  let {action, todoId} = useParams();
  // isCreateTodo => isOpenTodoDialog 가 맞을거같다.
  const [isOpenTodoDialog, setIsOpenTodoDialog] = React.useState(false);

  const navigate = useNavigate();

  const {status, data, error, isFetching} = useGetTodos()
  const createTodo = usePostTodo()
  const deleteTodo = useDeleteTodo()
  const putTodo = usePutTodo()

  console.log('todos:', status, data, error, isFetching)

  const handleClickLogout = () => {
    removeLocalStorage()
    navigate("/auth/signin")
  }

  // const getTodos = () => {
  //   console.log('get Todos')
  //   getTodos().then(r => {
  //     console.log('getTodos')
  //     setTodos(r.data.data)
  //   })
  // }

  useEffect(() => {
    // getTodos()
  }, [])


  const handleClickOpen = useCallback(() => {
    console.log('handle open!')
    setIsOpenTodoDialog(true);
  }, []);

  const handleClose = () => {
    console.log('handle close!')
    setIsOpenTodoDialog(false);
  };

  const handleClickCreate = (todo: any) => {
    createTodo.mutate(todo)
    setIsOpenTodoDialog(false);
    // createTodo(todo).then(r => {
    //   console.log(r)
    //   setIsOpenTodoDialog(false);
    //   // getTodos()
    // })
  }
  const handleClickEdit = (todo: any) => {

    console.log('handleClickEdit', todo)
    putTodo.mutate(todo)
    // updateTodo(todo).then(r => {
    //   console.log(r)
    //   // getTodos()
    //   navigate('/todos')
    // })
  }

  const handleClickDelete = (id: string) => {
    console.log('handleClickDelete', id)
    deleteTodo.mutate(id)
    // navigate('/todos')
  }

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
          <Button onClick={handleClickOpen}>
            Add Data
          </Button>
        </Stack>
        <TodoDialog open={isOpenTodoDialog} handleClose={handleClose} handleClickCreate={handleClickCreate}
                    title="Add Todo"/>
        <Suspense fallback={<div>살려줘...</div>}>
          <ErrorBoundary fallback={<div>살려줘...2</div>}>
            <div style={{display: 'flex', backgroundColor: '#12121'}}>
              <TodoItems todos={data?.data.data} handleClickDelete={handleClickDelete} selectTodoId={todoId}/>
            </div>
          </ErrorBoundary>
        </Suspense>

        {
          action && (
            <Suspense fallback={<div>살려줘...</div>}>
              <div style={{backgroundColor: '#12121'}}>
                <TodoDetail actionParam={action} handleClickEdit={handleClickEdit} selectTodoId={todoId}/>
              </div>
            </Suspense>
          )
        }

      </Box>
    </>
  )
}

export default Todo