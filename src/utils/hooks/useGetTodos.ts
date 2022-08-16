import {useQuery} from "@tanstack/react-query";
import {getTodos} from "../apis/todoApi";

export default function useGetTodos() {
  return useQuery(['todos'], getTodos, {suspense:true})
}