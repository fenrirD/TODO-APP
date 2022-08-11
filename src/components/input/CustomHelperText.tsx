import React, {ReactDOM} from "react";

export const CustomHelperText = (text:string, isValidate:boolean) => {
  return (
    <>
      <span style={{color: isValidate ? 'green' : 'red'}}>{text}</span>
    </>
  )
}

