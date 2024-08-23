
import React, { useState, useCallback } from 'react';
import { TextField, Button, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../axiosConfig';
// import { useNavigate } from 'react-router-dom';

const TaskForm = ({ initialTask = {}, onSubmit, onCancel }) => {
  // const navigate = useNavigate();
  const [title, setTitle] = useState(initialTask.title || '');
  const [description, setDescription] = useState(initialTask.description || '');
  const [dueDate, setDueDate] = useState(initialTask.dueDate ? new Date(initialTask.dueDate) : new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);


  // const formatDate = (date) => {
  //   return date.toISOString().split('T')[0];
  // };


  const formatDate = (date) => {
    const dateObj = new Date(date);
    dateObj.setUTCHours(0, 0, 0, 0);
    return dateObj.toISOString().split('T')[0];
  }
  

  const token = localStorage.getItem('token');
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;
//   setIsSubmitting(true);
//     console.log('Form submitted');
 
//   const taskData = {
//     title,
//     description,
//     due_date: formatDate(dueDate),
//     completed: initialTask.completed || false
//   };
//   delete taskData.id;
//   console.log('Sending task data:', taskData);
//   console.log('Current client time:', new Date().toString());

//   try {
//     let response;
//     if (initialTask.id) {
      
//       response = await axios.put(`/tasks/${initialTask.id}`, taskData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//     } else {
      
//       response = await axios.post('/tasks', taskData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//     }

//     if (response.status === 200 || response.status === 201) {
//       const updatedTask = response.data;
//       if (onSubmit) {
//         onSubmit(updatedTask);
//         console.log('onSubmit is being called');
//         onCancel();
//       }
//       // navigate('/');
//     }
//   } catch (error) {
//     console.error('Error handling task:', error);
//     alert(error.response?.data?.message || 'Error handling task. Please try again.');
//   }finally {
//     setIsSubmitting(false);
//   };
// };

const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);
  

  const taskData = {
    title,
    description,
    due_date: formatDate(dueDate),
    completed: initialTask.completed || false
  };

  delete taskData.id;
  

  try {
    let response;
    if (initialTask.id) {
      response = await axios.put(`/tasks/${initialTask.id}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    } else {
      
      response = await axios.post('/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    }

   

    if (response.status === 200 || response.status === 201) {
      const updatedTask = response.data;
      
      if (updatedTask.due_date) {
        updatedTask.due_date = updatedTask.due_date.split('T')[0];
      }
      if (onSubmit) {
        
        onSubmit(updatedTask);
        
        onCancel();
      }
    }
  } catch (error) {
    console.error('Error handling task:', error);
    alert(error.response?.data?.message || 'Error handling task. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
}, [isSubmitting, initialTask, token, title, description, dueDate, onSubmit, onCancel]);






  const pinkTheme = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#DB2777',
      },
      '&:hover fieldset': {
        borderColor: '#DB2777',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#DB2777',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#DB2777',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#DB2777',
      opacity: 0.7,
    },
  };

  const calendarTheme = {
    // Styles for the custom datepicker class
    '.custom-datepicker .react-datepicker__day--selected,': {
      backgroundColor: '#DB2777 !important', // Pink background for selected date
    },
    '.custom-datepicker .react-datepicker__day--keyboard-selected': {
      backgroundColor: '#DB2777 !important', // Pink background for keyboard-selected date
    },
    '.custom-datepicker .react-datepicker__day:hover': {
      backgroundColor: '#FEEDE9 !important', // Light pink background on hover
    },
  };
  return (
    <>
      {/* <style>
        {`
          .custom-datepicker .react-datepicker__day--selected,
          .custom-datepicker .react-datepicker__day--keyboard-selected {
            background-color: #DB2777 !important;
          }

          .custom-datepicker .react-datepicker__day:hover {
            background-color: #FEEDE9 !important;
          }
        `}
      </style> */}

<style>
        
        {Object.keys(pinkTheme).map((key) => `${key} { ${pinkTheme[key]} }`)}
        
        {Object.keys(calendarTheme).map((key) => `${key} { ${calendarTheme[key]} }`)}
      </style>
    <Box component="form" onSubmit={handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={pinkTheme}
      />
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={pinkTheme}
      />
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        customInput={<TextField fullWidth label="Due Date" sx={pinkTheme} />}
        dateFormat="MMMM d, yyyy"
         wrapperClassName="custom-datepicker"
      />
      <Box className="space-x-2">
        <Button variant="contained"  type="submit"
         sx={{
          backgroundColor: '#DB2777',
          '&:hover': {
            backgroundColor: '#BE185D',
          },
        }}
        >
          {initialTask.id ? 'Save Changes' : 'Add Task'}
        </Button>
        <Button variant="outlined" onClick={onCancel} 
          sx={{ 
            color: '#DB2777', 
            borderColor: '#DB2777',
            '&:hover': {
              backgroundColor: '#FCE7F3',
              borderColor: '#DB2777',
            },
          }}
          >
          Cancel
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default TaskForm;