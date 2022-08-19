
import {updateTodo} from "../apis/todoApi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

export default function usePutTodo() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  return useMutation(updateTodo,{
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["todos"]).then()
      navigate('/todos')
      // Boom baby!
    },
  })
}