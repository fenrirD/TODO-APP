import React, {useEffect, useState} from "react";
import {HElPER_TEXT} from "../../constants/constant";

/**
 * 모든 Input 컴포넌트에서 범용성 있게 사용하기 위한 Custom hook
 * @param initialValue
 * @param inputId
 * @param helper
 * @param validator
 */
export const useInput = (initialValue:string, inputId:string, helper?:Function, validator?:Function ) => {

  const [value, setValue] = useState(initialValue)
  const targetId = inputId.toUpperCase()
  const [helperText, setHelperText] = useState<React.ReactNode>(HElPER_TEXT[targetId])

  useEffect(() => {
    setValue(initialValue);
  },[initialValue]);

  const onChange = (event:React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {

    const {value} = event.currentTarget
    let isValidate = false
    if(typeof validator === 'function') {
      isValidate = validator(value)
    }
    if(helper && typeof helper === 'function') {
      setHelperText(helper(HElPER_TEXT[targetId],isValidate))
    }
    setValue(value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {options :{value, onChange, helperText}, reset}
}