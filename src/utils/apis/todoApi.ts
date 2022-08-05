import axios from "axios";
import {Authorization} from "../../constants/constant";

const authorization = new Authorization();

const API_SERVER = "http://localhost:8080"

const axiosConfig = {
  headers: {
    authorization: authorization.token
  }
}

export const getTodosApi = async () => {
  console.log("todos", authorization.token)
  const r = await axios.get(`${API_SERVER}/todos`, axiosConfig)
  console.log(r, 'todos')
  return r
}

export const getTodoById = async (id: string) => {
  console.log('siginup',)
  const r = await axios.get(`${API_SERVER}/todos/${id}`, axiosConfig)
  return r
}

export const createTodo = async (todo: any) => {
  console.log('createTodo', todo)
  const r = await axios.post(`${API_SERVER}/todos/`, todo, {
    headers: {
      authorization: authorization.token
    }
  })
  console.log(r, 'createTodo')
  return r
}

export const deleteTodo = async (id: string) => {
  return await axios.delete(`${API_SERVER}/todos/${id}`, axiosConfig)
}

export const updateTodo = async (todo: any) => {
  return await axios.put(`${API_SERVER}/todos/${todo.id}`, todo, axiosConfig)
}