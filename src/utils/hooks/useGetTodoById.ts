import {useQuery} from "@tanstack/react-query";
import {getTodoById} from "../apis/todoApi";

export default function useGetTodoById(id:string) {
  return useQuery(['todo',id],()=>getTodoById(id))
}