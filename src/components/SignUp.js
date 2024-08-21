
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useUser } from './UserContext';
import axios from '../axiosConfig';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('/auth/register', { username, email, password });
      if (response.data.token) {
        await login({ email, password });
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Box className="flex flex-col items-center mt-10"
    sx={{ 
      '& .MuiTextField-root': { 
        mb: 2, 
        width: '300px',
        '& .MuiOutlinedInput-root': {
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
      },
    }}>
      <Typography variant="h4" className="mb-4">Sign Up</Typography>
      <form onSubmit={handleSignUp} className="flex flex-col items-center" >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained"  type="submit"  sx={{ 
            backgroundColor: 'grey', 
            '&:hover': {
              backgroundColor: '#DB2777',
            },
            width: '300px',
            height: '56px', // Matching the height of TextField
            mb: 2
          }}>Sign Up</Button>
      </form>

      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Already have an account? <Link to="/signin" style={{ color: '#DB2777' }}>Sign In</Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
