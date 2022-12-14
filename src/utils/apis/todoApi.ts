import {Authorization} from "../../constants/constant";
import customAxios from "../customAxios";
import {getToken} from "../localStorages";
import {TodoType} from "../types";
import {useNavigate} from "react-router-dom";
import {history} from "../../index";
import {snackbar} from "../../App";


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
  // const navigate = useNavigate()
  const tokenCheck = () => getToken()
  console.log(tokenCheck())
  if(!tokenCheck()) {
    snackbar.dispatch({type: 'ON', payload:{severity:'warning', message:"Token이 유효하지 않습니다.!"}})
    history.push("/auth/signin")
  }
  return config
},error => {
  console.log(error,"error")
})



export const getTodos = async () => {
  return axios.get(`/todos`)
}

export const getTodoById = async (id: string) => {
  return axios.get(`/todos/${id}`)
}

export const createTodo = async (todo: TodoType) => {
  return axios.post(`/todos/`, todo)
}

export const deleteTodo = async (id: string) => {
  return axios.delete(`/todos/${id}`)
}

export const updateTodo = async (todo: TodoType) => {
  return axios.put(`/todos/${todo.id}`, todo)
}