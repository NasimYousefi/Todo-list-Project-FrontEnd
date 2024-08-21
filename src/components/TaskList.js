
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, List, Button, ListItemButton, ListItemText, TextField, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { isToday, isFuture, isPast } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useUser } from './UserContext.js';
import { debounce } from 'lodash';

const TaskList = () => {
  const { user, token, loading } = useUser();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    if (!user || !token) return;
    try {
      const response = await axios.get(`/tasks/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [user, token]);

  const handleDelete = useCallback(
    async (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      await axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Task deleted successfully');
    },
    [token]
  );

  const debouncedDelete = useCallback(
    debounce((taskId) => {
      handleDelete(taskId).catch((error) => {
        console.error('Failed to delete task:', error);
        setTasks((prevTasks) => {
          const deletedTask = prevTasks.find((task) => task.id === taskId);
          return deletedTask ? [...prevTasks, deletedTask] : prevTasks;
        });
      });
    }, 300),
    [handleDelete]
  );

  useEffect(() => {
    if (!loading && token) {
      fetchTasks();
    }
  }, [fetchTasks, loading, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !token) {
    return <div>Please log in to view tasks.</div>;
  }

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const taskToToggle = tasks.find((task) => task.id === taskId);
      const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
      await axios.put(`/tasks/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      (filter === 'all') ||
      (filter === 'completed' && task.completed) ||
      (filter === 'inprogress' && !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const todayTasks = filteredTasks.filter((task) => isToday(new Date(task.due_date)));
  const upcomingTasks = filteredTasks.filter((task) => isFuture(new Date(task.due_date)) && !isToday(new Date(task.due_date)));
  const pastTasks = filteredTasks.filter((task) => isPast(new Date(task.due_date)) && !isToday(new Date(task.due_date)));

  return (
    <Box className="flex h-screen bg-gray-100">
      <Box className="w-64 bg-white p-4 shadow-md">
        <List>
          {['all', 'completed', 'inprogress'].map((filterOption) => (
            <ListItemButton
              key={filterOption}
              selected={filter === filterOption}
              onClick={() => setFilter(filterOption)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#FCE7F3',
                  '&:hover': {
                    backgroundColor: '#FCE7F3',
                  },
                },
              }}
            >
              <ListItemText primary={filterOption.charAt(0).toUpperCase() + filterOption.slice(1)} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box className="flex-1 p-8">
        {!isAddingTask && (
          <>
            <Box className="flex justify-end items-center mb-4">
              <Button
                sx={{
                  backgroundColor: 'grey',
                  '&:hover': {
                    backgroundColor: '#DB2777',
                  },
                }}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAddingTask(true)}
              >
                Add Task
              </Button>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
              sx={{
                '.MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#DB2777',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#FDF2F8',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#DB2777',
                },
              }}
            />
          </>
        )}

        {isAddingTask && (
          <TaskForm onSubmit={fetchTasks} onCancel={() => setIsAddingTask(false)} />
        )}

        {!isAddingTask && (
          <Box className="h-[calc(100vh-200px)] overflow-auto">
            <Typography variant="h6" className="mb-2">Past Tasks</Typography>
            <List>
              {pastTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={() => handleEdit(task.id)}
                  onDelete={() => debouncedDelete(task.id)}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </List>

            <Typography variant="h6" className="mb-2">Today</Typography>
            <List>
              {todayTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={() => handleEdit(task.id)}
                  onDelete={() => debouncedDelete(task.id)}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </List>

            <Typography variant="h6" className="mt-4 mb-2">Upcoming</Typography>
            <List>
              {upcomingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={() => handleEdit(task.id)}
                  onDelete={() => debouncedDelete(task.id)}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskList;