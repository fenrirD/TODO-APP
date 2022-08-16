import customAxios from "../customAxios";
import {User} from "../types";


export const singIn = async (user: User) => {
  try {
    const r = await customAxios().post("/users/login", user)
    return r
  } catch (error) {
    console.error(error)
  }
}

export const singUp = async (user: User) => {
  try {
    const r = await customAxios().post("/users/create", user)
    return r
  } catch (error) {
    console.error(error)
  }
}