import TextField from "@mui/material/TextField";
import * as React from "react";
import {useInput} from "../../utils/hooks/useInput";
// TODO 추후에 생각해보자.
export default function TodoForm() {

  const titleInput = useInput('', 'title',)
  const contentInput = useInput('', 'title',)

  return (
    <>
      <div>
        <TextField
          margin="dense"
          id="title"
          label="title"
          fullWidth
          variant="standard"
          {...titleInput.options}

          // value={todo.title}
          disabled={true}
          // onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id="content"
          label="content"
          multiline
          rows={5}
          fullWidth
          margin="dense"
          disabled={true}
          // value={todo.content}
          // onChange={handleChange}
          {...contentInput.options}
        />
      </div>
    </>
  )

}