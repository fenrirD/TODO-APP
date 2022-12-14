import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTodo} from "../apis/todoApi";

export default function usePostTodo() {

  const queryClient = useQueryClient()
  return useMutation(createTodo,{
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["todos"]).then()
      // Boom baby!
    },
  })
}