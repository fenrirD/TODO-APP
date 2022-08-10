import axios, {AxiosInstance} from "axios";
import {API_SERVER, Authorization} from "../constants/constant";


const authorization = new Authorization();

const clientAxios = (isAuthorization?:any) => {
  //TODO 추후에 header에 대한 추상화를 고려해보자. 굳이 해야 할 필요가 있을까?

  // if(isAuthorization) {
  //
  // }

  // console.log('clientApi')

  return axios.create({
    baseURL: API_SERVER
    // headers: {}
  })
}

export default clientAxios
