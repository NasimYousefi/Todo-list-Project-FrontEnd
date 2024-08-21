import axios from '../axiosConfig';
// Get tasks
export const getTasks = () => {
  return axios.get('/api/tasks/user/:userId');
};
// Add tasks
export const addTask = (task) => {
  return axios.post('/api/tasks/', task);
};

// Edit tasks
export const updateTask = (taskId, updatedTask) => {
  return axios.put(`/api/tasks/:${taskId}`, updatedTask);
};

// Delete tasks
export const deleteTask = (taskId) => {
  return axios.delete(`api/tasks/:${taskId}`);
};
