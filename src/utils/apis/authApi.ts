import customAxios from "../customAxios";
import {User} from "../types";


export const singIn = async (user: User) => {
  try {
    return customAxios().post("/users/login", user)
  } catch (error) {
    console.error(error)
  }
}

export const singUp = async (user: User) => {
  try {
    return customAxios().post("/users/create", user)
  } catch (error) {
    console.error(error)
  }
}