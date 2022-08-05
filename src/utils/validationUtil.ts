const emailValidation = (email:string) => {
  const regExp = /^[\w]+[@][\w]+[.][\w]+/gm;
  return regExp.test(email)
}

const passwordValidation = (password:string) => {
  return password.length >= 8
}

const authValidation = (user: any) => {

  const isEmail = emailValidation(user.email)
  const isPassword = passwordValidation(user.password)
  console.log('authValidation', isEmail, isPassword, user.password)
  return {
    isEmail,
    isPassword
  }
}

export default authValidation