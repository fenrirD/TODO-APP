import React, {useState} from "react";
import {HElPER_TEXT} from "../constants/constant";

export const useInput = (initialValue:string, inputId:string, helper?:Function, validator?:Function, ) => {

  const [value, setValue] = useState(initialValue)
  const targetId = inputId.toUpperCase()
  const [helperText, setHelperText] = useState<React.ReactNode>(HElPER_TEXT[targetId])
  console.log(value,"value!!")

  const onChange = (event:any) => {

    const {value} = event.target
    let isValidate = false
    if(typeof validator === 'function') {
      isValidate = validator(value)
      // console.log(helper)
    }
    if(helper && typeof helper === 'function') {
      setHelperText(helper(HElPER_TEXT[targetId],isValidate))
    }
    setValue(value)
  }

  const reset = () => {
    setValue(initialValue)
  }
  console.log(initialValue, value, "useInput")
  return {options :{value, onChange, helperText}, reset}
}