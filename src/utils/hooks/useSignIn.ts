import {useMutation} from "@tanstack/react-query";
import {singIn} from "../apis/authApi";
import {setToken} from "../localStorages";
import {useNavigate} from "react-router-dom";

export default function useSignIn() {
  const navigate = useNavigate()
  return useMutation(singIn,{
    onSuccess: (data, variables, context)=> {
      setToken(variables, data?.data.token)
      navigate("/todos")
    },
    // onError: (error, variables, context) => {
    //   console.log(error, variables, context)
    // }
  })
}