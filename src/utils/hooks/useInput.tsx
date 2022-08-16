import React, {useEffect, useState} from "react";
import {HElPER_TEXT} from "../../constants/constant";

export const useInput = (initialValue:string, inputId:string, helper?:Function, validator?:Function, ) => {

  const [value, setValue] = useState(initialValue)
  const targetId = inputId.toUpperCase()
  const [helperText, setHelperText] = useState<React.ReactNode>(HElPER_TEXT[targetId])
  // console.log('initialValue:', initialValue, "value:",value)

  useEffect(() => {
    // console.log("initialValue - useEffect =>", initialValue)
    setValue(initialValue);
  },[initialValue]);

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

  return {options :{value, onChange, helperText}, reset}
}