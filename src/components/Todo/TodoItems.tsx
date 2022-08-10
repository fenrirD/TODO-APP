import * as React from 'react'
import {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {Checkbox} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

const TodoItems = ({todos, handleClickDelete, handleClickDetail, selectTodoId}: any) => {

  const [checked, setChecked] = useState('');
  const navigate = useNavigate()
  console.log(selectTodoId, 'selectedTodo',checked)
  const handleToggle = (id: string) => () => {
    const selectedId: any = checked === id ? '' : id
    setChecked(selectedId);
    const url = '/todos' + (selectedId.length ? `/detail/${selectedId}` : '')
    navigate(url)
  }
  return (
    <Box
      sx={{width: '100%', height: "30vh", overflowY: 'auto  '}}
    >
      <h2>Todo List</h2>
      <List sx={{width: '50vh', bgcolor: 'background.paper'}}>
        {todos.map(({id, title, content}: any, idx: number) => {
          const labelId = `checkbox-list-label-${id}`;
          return (
            <ListItem
              key={idx}
              secondaryAction={
                <div>
                  <IconButton edge="end" aria-label="comments" onClick={() => handleClickDelete(id)}>
                    <DeleteIcon/>
                  </IconButton>
                </div>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked === id || selectTodoId ===id}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{'aria-labelledby': labelId}}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${title}`}/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
export default TodoItems