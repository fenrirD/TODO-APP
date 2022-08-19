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

  const handleClickLogout = () => {
    removeLocalStorage()
    navigate("/auth/signin")
  }

  useEffect(() => {
    // getTodos()
  }, [])


  const handleClickOpen = useCallback(() => {
    setIsOpenTodoDialog(true);
  }, []);

  const handleClose = () => {
    setIsOpenTodoDialog(false);
  };

  const handleClickCreate = (todo: any) => {
    createTodo.mutate(todo)
    setIsOpenTodoDialog(false);
  }
  const handleClickEdit = (todo: any) => {
    putTodo.mutate(todo)
  }

  const handleClickDelete = (id: string) => {
    deleteTodo.mutate(id)
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