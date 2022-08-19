import axios, {AxiosInstance, AxiosRequestHeaders} from "axios";
import {API_SERVER, Authorization} from "../constants/constant";


const authorization = new Authorization();
interface TokenType extends AxiosRequestHeaders{
  authorization: string
}

const customAxios = (headers?:AxiosRequestHeaders) => {
  //TODO 추후에 header에 대한 추상화를 고려해보자. 굳이 해야 할 필요가 있을까?
  return axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    headers: headers
  })
}

export default customAxios
