
export const getToken = () => {
  const token:string = window.localStorage.getItem("authToken")!
  return JSON.parse(token)
}

export const setToken = (user:any, token: string) => {
  return window.localStorage.setItem("authToken",JSON.stringify({
    ...user,
    token
  }))
}
export const removeLocalStorage = () =>{
  window.localStorage.clear()
}