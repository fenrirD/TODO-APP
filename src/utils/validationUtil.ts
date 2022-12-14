export const emailValidation = (email:string) => {
  const regExp = /^[\w]+[@][\w]+[.][\w]+/gm;
  return regExp.test(email)
}

export const passwordValidation = (password:string) => {
  return password.length >= 8
}

const authValidation = (user: any) => {

  const isEmail = emailValidation(user.email)
  const isPassword = passwordValidation(user.password)
  return {
    isEmail,
    isPassword
  }
}

export default authValidation