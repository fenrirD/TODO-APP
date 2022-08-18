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


// 이 부분에 검증 부분 추가해주면 참 좋을듯.! Token 에 대한
axios.interceptors.request.use((config)=>{
  console.log('axios config', config)
  return config
})

const tokenCheck = () => getToken()

const  fun = async () => {
  return new Promise(resolve => {
      setTimeout(()=>{
        resolve('reslove')
      },5000)
  })
}

export const getTodos = async () => {
  console.log("todos", authorization.token)
  return axios.get(`/todos`)
}

export const getTodoById = async (id: string) => {
  return axios.get(`/todos/${id}`)
}

export const createTodo = async (todo: TodoType) => {
  const r = await axios.post(`/todos/`, todo)
  return r
}

export const deleteTodo = async (id: string) => {
  return await axios.delete(`/todos/${id}`)
}

export const updateTodo = async (todo: TodoType) => {
  return await axios.put(`/todos/${todo.id}`, todo)
}