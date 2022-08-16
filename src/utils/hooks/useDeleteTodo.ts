import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTodo, deleteTodo, updateTodo} from "../apis/todoApi";
import {useNavigate} from "react-router-dom";

export default function useDeleteTodo() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  return useMutation(deleteTodo,{
    onSuccess: (data, variables, context) => {
      console.log('use post Todo', data)
      navigate('/todos')
      queryClient.invalidateQueries(["todos"]).then()
      // Boom baby!
    },
  })
}