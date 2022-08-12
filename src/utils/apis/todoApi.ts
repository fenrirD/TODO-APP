import {Authorization} from "../../constants/constant";
import customAxios from "../customAxios";
import {getToken} from "../localStorages";
import {TodoType} from "../types";
import {AxiosPromise, AxiosResponse} from "axios";


// Token의 변조를 감지하는 방법은?
// 매 요청마다 토큰 값을 확인해야 할거 같다.
const authorization = new Authorization();

const axiosConfig = {
  headers: {
    authorization: authorization.token
  }
}

const axios = customAxios(axiosConfig.headers)



const tokenCheck = () => getToken()

export const getTodosApi = async () => {
  console.log("todos", authorization.token)
  return await axios.get(`/todos`)
}

export const getTodoById = async (id: string) => {
  const r = await axios.get(`/todos/${id}`)
  return r
}

export const createTodo = async (todo: TodoType) => {
  const r = await axios.post(`/todos/`, todo)
  return r
}

export const deleteTodo = async (id: string) => {
  return axios.delete(`/todos/${id}`)
}

export const updateTodo = async (todo: TodoType) => {
  return await axios.put(`/todos/${todo.id}`, todo)
}