import {getToken} from "../utils/localStorages";

export const HEADER_TITLE:any = {
  TODOS: "Welcome to Todo App!",
  SIGNIN: "SignIn Page",
  SIGNUP: "SignUP Page",
}

export class Authorization {

  token

  constructor() {
    this.token = getToken()
  }

}