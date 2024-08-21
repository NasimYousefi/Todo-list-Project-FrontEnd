import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const Task = ({ task }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <Checkbox
        edge="start"
        checked={task.completed}
        tabIndex={-1}
        disableRipple
      />
      <ListItemText
        primary={task.title}
        secondary={`Due: ${task.due_date || 'Not set'}`}
      />
    </ListItem>
  );
};

export default Task;