import {Route, Routes} from "react-router-dom";
import Login from "../components/auth/Login";
import Todo from "../components/Todo/Todo";

export function Router({path}:{path:string}) {
  return(
    <>
      <Routes>
        <Route path="auth">
          <Route path="signin" element={<Login path={path}/>} />
          <Route path="signup" element={<Login path={path}/>} />
        </Route>
        <Route path="todos" element={<Todo/>}/>
        <Route path="todos/:action/:todoId" element={<Todo/>}/>
      </Routes>
    </>
    )
}