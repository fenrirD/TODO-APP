import {useMutation} from "@tanstack/react-query";
import {singIn, singUp} from "../apis/authApi";
import {setToken} from "../localStorages";
import {useNavigate} from "react-router-dom";

export default function useSignUp() {
  const navigate = useNavigate()
  return useMutation(singUp,{
    onSuccess: (data, variables, context)=> {
      console.log('useSign Success :', data, variables)
      navigate("/auth/signin")
    }
  })
}