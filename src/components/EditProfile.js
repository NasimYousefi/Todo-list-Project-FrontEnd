
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useUser } from './UserContext';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUserInfo } = useUser();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSave = async () => {
    try {
      if (!user || !user.id) {
        console.error('User ID is not available');
        return;
      }
        console.log('Data to be sent:', { username, email });
      await axios.put(`/user/edit/${user.id}`, { username, email });
      updateUserInfo({ username, email });
      if (password && newPassword) {
        console.log('Password update data:', {
          currentPassword: password,
          newPassword: newPassword
        });
        const passwordResponse = await axios.put(`/user/edit/password/${user.id}`, { 
        currentPassword: password,
        newPassword: newPassword
        });
        console.log('Password update response:', passwordResponse.data);
      }
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      //alert('Error updating profile')
    }
  };


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
  const buttonStyle = {
    width: '150px',
    height: '40px',
  };

  return (
    <div style={{ padding: '20px', width:'400px', margin:'10px auto'}}>
      <Typography variant="h4">Edit Profile</Typography>
      <TextField
        label="Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        sx={pinkTheme}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        sx={pinkTheme}
      />
      <TextField
        label="Current Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        sx={pinkTheme}
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
        style={{ marginBottom: '30px' }}
        sx={pinkTheme}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginRight: '30px' }}
        sx={{ 
          ...buttonStyle,
          backgroundColor: '#BE185D',
          '&:hover': { backgroundColor: '#9D174D' },
        }}
      >
        Save
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/profile')}
      style={{ marginLeft: '30px' }}
        sx={{ 
          ...buttonStyle, 
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
    </div>
  );
};

export default EditProfile;
