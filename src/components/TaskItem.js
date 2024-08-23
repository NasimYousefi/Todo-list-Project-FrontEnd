
// import React, { useState } from 'react';
// import { ListItem, ListItemText, Checkbox, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';
// import axios from '../axiosConfig';

// const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
//   const [isDeleting, setIsDeleting] = useState(false);
//   const navigate = useNavigate();

//   const handleDeleteConfirm = async () => {
//     try {
//       console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      
//       await axios.delete(`/tasks/${task.id}`);
//       onDelete(task.id);
//       setIsDeleting(false);
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       alert("I can't delete task: "+ task.id)
//     }
//   };

//   const handleCheckboxClick = async (e) => {
//     e.stopPropagation();
//     try {
//       const updatedTask = { ...task, completed: !task.completed };
//       await axios.put(`/tasks/${task.id}`, updatedTask);
//       onToggleComplete(task.id);
//     } catch (error) {
//       console.error('Error toggling task completion:', error);
//     }
//   };

//   const handleEditClick = (e) => {
//     e.stopPropagation();
//     onEdit(task.id);
//   };

//   const handleListItemClick = () => {
//     navigate(`/task/${task.id}`);
//   };

//   return (
//     <>
//       <ListItem
//         button
//         onClick={handleListItemClick}
//         // disablePadding
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           '&:hover': {
//             backgroundColor: '#FCE7F3',
//           },
//           transition: 'background-color 0.3s',
//           borderRadius: '4px',
//           marginBottom: '8px',
//         }}
//       >
//         <Checkbox
//           edge="start"
//           checked={task.completed}
//           tabIndex={-1}
//           disableRipple
//           onChange={handleCheckboxClick}
//           onClick={(e) => e.stopPropagation()}
//           sx={{
//             color: 'action.disabled',
//             '&.Mui-checked': {
//               color: '#DB2777', 
//             },
//           }}
//         />
//         <ListItemText 
//           primary={task.title} 
//           className={task.completed ? 'line-through' : ''}
//           // style={{ flex: 1, marginLeft: 8 }}
//           sx={{
//             textDecoration: task.completed ? 'line-through' : 'none',
//             textDecorationColor: task.completed ? '#DB2777' : 'inherit', 
//             color: task.completed ? '#DB2777' : 'inherit',
//             flex: 1,
//             marginLeft: 1,
//           }}
//         />
//         <IconButton edge="end"  onClick={handleEditClick}
//         sx={{
//           '&:hover': {
//             backgroundColor: '#FCE7F3',
//           },
//           '& .MuiSvgIcon-root:hover': {
//             color: '#BE185D',
//           },
//         }}
//         >
//           <EditIcon />
//         </IconButton>
//         <IconButton edge="end"  onClick={(e) => { e.stopPropagation(); setIsDeleting(true); }}
//           sx={{
//             '&:hover': {
//               backgroundColor: '#FCE7F3',
//             },
//             '& .MuiSvgIcon-root:hover': {
//               color: '#BE185D',
//             },
//           }}
//           >
//           <DeleteIcon />
//         </IconButton>
//       </ListItem>

//       <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
//         <DialogTitle>Delete Task</DialogTitle>
//         <DialogContent>Are you sure you want to delete this task?</DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDeleting(false)}
//             sx={{ 
//               color: '#DB2777',
//               '&:hover': { backgroundColor: '#FCE7F3' },
//             }}
//             >Cancel</Button>
//           <Button onClick={handleDeleteConfirm} color="secondary"
//           sx={{ 
//             color:'white',
//             backgroundColor: '#BE185D',
//             '&:hover': { backgroundColor: '#9D174D' },
//           }}
//           >Delete</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default TaskItem;

import React, { useState } from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteConfirm = () => {
    onDelete(task.id); // Call the passed delete handler
    setIsDeleting(false);
  };

  const handleCheckboxClick = async (e) => {
    e.stopPropagation();
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`/tasks/${task.id}`, updatedTask); // Update task completion status
      onToggleComplete(task.id); // Call the passed toggle handler
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(task.id); // Call the passed edit handler
  };

  const handleListItemClick = () => {
    navigate(`/task/${task.id}`); // Navigate to task details
  };

  return (
    <>
      <ListItem
        button
        onClick={handleListItemClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#FCE7F3',
          },
          transition: 'background-color 0.3s',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        <Checkbox
          edge="start"
          checked={task.completed}
          tabIndex={-1}
          disableRipple
          onChange={handleCheckboxClick}
          onClick={(e) => e.stopPropagation()}
          sx={{
            color: 'action.disabled',
            '&.Mui-checked': {
              color: '#DB2777',
            },
          }}
        />
        <ListItemText
          primary={task.title}
          sx={{
            textDecoration: task.completed ? 'line-through' : 'none',
            textDecorationColor: task.completed ? '#DB2777' : 'inherit',
            color: task.completed ? '#DB2777' : 'inherit',
            flex: 1,
            marginLeft: 1,
          }}
        />
        <IconButton
          edge="end"
          onClick={handleEditClick}
          sx={{
            '&:hover': {
              backgroundColor: '#FCE7F3',
            },
            '& .MuiSvgIcon-root:hover': {
              color: '#BE185D',
            },
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleting(true);
          }}
          sx={{
            '&:hover': {
              backgroundColor: '#FCE7F3',
            },
            '& .MuiSvgIcon-root:hover': {
              color: '#BE185D',
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>

      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleting(false)}
            sx={{
              color: '#DB2777',
              '&:hover': { backgroundColor: '#FCE7F3' },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            sx={{
              color: 'white',
              backgroundColor: '#BE185D',
              '&:hover': { backgroundColor: '#9D174D' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;

