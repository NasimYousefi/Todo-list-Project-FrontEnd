
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TaskForm from './TaskForm';
import axios from '../axiosConfig';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTask().finally(() => setLoading(false));
  }, [id]);

  // const fetchTask = async () => {
  //   try {
  //     const response = await axios.get(`/tasks/${id}`);
  //     setTask(response.data);
  //   } catch (error) {
  //     console.error('Error fetching task:', error);
  //     navigate('/');
  //   }
  // };

  const fetchTask = async () => {
    try {
      const response = await axios.get(`/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
      alert("I can't find task")
      navigate('/');
    }
  };

  
  const handleEdit = async (updatedTask) => {
    try {
  //     await axios.put(`/tasks/${id}`, updatedTask);
  //     setTask({ ...task, ...updatedTask });
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error('Error updating task:', error);
  //     alert(error.response?.data?.message || 'Error updating task. Please try again.');
  //   }
  // };
  const { id: _, ...taskDataWithoutId } = updatedTask;
  console.log(`Sending PUT request to: /tasks/${id}`);
  console.log('Task data:', taskDataWithoutId);
  const response = await axios.put(`/tasks/${id}`, taskDataWithoutId, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  console.log('Server response:', response.data);
  setTask(response.data);
  setIsEditing(false);
} catch (error) {
  console.error('Error updating task:', error);
  alert(error.response?.data?.message || 'Error updating task. Please try again.');
}
};

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
if (!task) return <Typography>Task not found</Typography>;

const buttonStyle = {
  width: '120px',
  height: '40px',
};

  return (
    <Box className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {isEditing ? (
        <TaskForm initialTask={task} onSubmit={handleEdit} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <Typography variant="h5">{task.title}</Typography>
          <Typography variant="body1" className="mt-2">{task.description}</Typography>
          <Typography variant="body2" className="mt-2">
            {/* Due: {new Date(task.dueDate).toDateString()} */}
            Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
            </Typography>
          <Box className="mt-4 space-x-2">
            <Button variant="contained" 
              onClick={() => setIsEditing(true)}
              sx={{ 
                ...buttonStyle,
                backgroundColor: '#BE185D',
                '&:hover': { backgroundColor: '#9D174D' },
              }} 
              >Edit</Button>
            <Button variant="contained" color="secondary" onClick={() => setIsDeleting(true)}
               sx={{ 
                ...buttonStyle,
                backgroundColor: '#EC4899',
                '&:hover': { backgroundColor: '#BE185D' },
              }}
              >Delete</Button>
            <Button variant="outlined" onClick={() => navigate('/')}
              sx={{ 
                ...buttonStyle, 
                  color: '#DB2777', 
                  borderColor: '#DB2777',
                  '&:hover': {
                    backgroundColor: '#FCE7F3',
                    borderColor: '#DB2777',
                  },
              }}
              >Back</Button>
          </Box>
        </>
      )}

      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)}
            sx={{ 
              color: '#DB2777',
              '&:hover': { backgroundColor: '#FCE7F3' },
            }}
            >Cancel</Button>
          <Button onClick={handleDelete} color="secondary"
          sx={{ 
            color:'white',
            backgroundColor: '#BE185D',
            '&:hover': { backgroundColor: '#9D174D' },
          }}
          >Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDetail;