import clientAxios from "../axios";
import {User} from "../types";


export const singIn = async (user:User) => {
  try {
    const r = await clientAxios().post("/users/login",user)
    return r
  }catch (error) {
    console.error(error)
  }
}

export const singUp = async (user:any) => {

  const r = await clientAxios().post("/users/create", user)
  return r
}