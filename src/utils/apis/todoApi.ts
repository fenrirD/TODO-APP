import axios from "axios";

export const singIn = async (user:any) => {
  console.log("signin", user)
  const r = await axios.post("http://localhost:8080/users/login",user)

  console.log(r,'sigin')
  return r
}

export const singUp = async (user:any) => {
  console.log('siginup', user)
  const r = await axios.post("http://localhost:8080/users/create",user)
  return r
}