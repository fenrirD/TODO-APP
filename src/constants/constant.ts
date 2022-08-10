import {getToken} from "../utils/localStorages";

export const HEADER_TITLE:any = {
  TODOS: "Welcome to Todo App!",
  SIGNIN: "SignIn Page",
  SIGNUP: "SignUP Page",
}

export const API_SERVER:string = "http://localhost:8080"

export class Authorization {

  token

  constructor() {
    this.token = getToken()
  }



}