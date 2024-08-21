
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../axiosConfig';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`/tasks/${id}`);
      setTask(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDueDate(response.data.dueDate ? new Date(response.data.dueDate) : null);
    } catch (error) {
      console.error('Error fetching task:', error);
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/${id}`, { 
        title,
        description,
        due_date: dueDate, 
        completed: task.completed });
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!task) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Typography variant="h5" className="text-center mb-4">Edit Task</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#DB2777',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#DB2777',
            },
          }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#DB2777',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#DB2777',
            },
          }}
        />
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          customInput={<TextField fullWidth label="Due Date"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#DB2777',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#DB2777',
              },
            }}
            />}
          dateFormat="MMMM d, yyyy"
          isClearable
          
        />
        <Box className="flex justify-end space-x-2">
          <Button onClick={handleCancel} variant="outlined"
           sx={{ 
            color: '#DB2777', 
            borderColor: '#DB2777',
            '&:hover': {
              backgroundColor: '#FCE7F3',
              borderColor: '#DB2777',
            },
          }}
          >Cancel</Button>
          <Button type="submit" variant="contained" color="primary"
          sx={{
            backgroundColor: '#DB2777',
            '&:hover': {
              backgroundColor: '#BE185D',
            },
          }}
          >Save</Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditTask;