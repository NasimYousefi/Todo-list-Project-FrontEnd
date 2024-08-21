
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useUser } from './UserContext.js'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to sign in with:", email);
      const success = await login({ email, password });
      if (success) {
        console.log("Sign in successful");
        navigate('/', { replace: true });
      } else {
        console.log("Sign in failed");
       
      }
    } catch (error) {
      console.error('Error signing in:', error);
     
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
      <Typography variant="h4" className="mb-4">Sign In</Typography>
      <form onSubmit={handleSignIn} className="flex flex-col items-center">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
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
        <Button variant="contained" type="submit" 
         sx={{ 
          backgroundColor: 'grey', 
          '&:hover': {
            backgroundColor: '#DB2777',
          },
          width: '300px',
          height: '56px', // Matching the height of TextField
          mb: 2
        }}>Sign In</Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#DB2777' }}>Sign up</Link>
      </Typography>

    </Box>
  );
};

export default SignIn;