
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EditTask from './components/EditTask';
import UserProvider, { useUser } from './components/UserContext';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

const theme = createTheme();

function AppContent() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/" element={user ? <TaskList /> : <Navigate to="/signin" />} />
          <Route path="/task/:id" element={user ? <TaskDetail /> : <Navigate to="/signin" />} />
          <Route path="/edit-task/:id" element={user ? <EditTask /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;