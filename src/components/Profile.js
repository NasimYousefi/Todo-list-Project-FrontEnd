
import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';


const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser();


  const buttonStyle = {
    width: '120px',
    height: '40px',
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ padding: '20px 40px' }}>Profile</Typography>
      <Typography variant="h6" style={{ padding: '10px 40px' }}>Name: {user?.username || 'No name'}</Typography>
      <Typography variant="h6" style={{ padding: '10px 40px 30px 40px' }}>Email: {user?.email || 'No email'}</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/profile/edit')}
        style={{ margin: '0 40px', }}
        sx={{ 
          ...buttonStyle,
          backgroundColor: '#BE185D',
          '&:hover': { backgroundColor: '#9D174D' },
        }}
      >
        Edit
      </Button>

      <Button variant="outlined" color="secondary" onClick={() => navigate('/')}
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
        Back
      </Button>
    </div>
  );
};

export default Profile;

