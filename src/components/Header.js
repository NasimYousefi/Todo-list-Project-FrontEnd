
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleDialogClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleDialogConfirm = () => {
    handleLogout();
    setOpenLogoutDialog(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#DB2777' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>TodoList</Typography>
          {user ? (
            <>
              <Button color="inherit" onClick={handleProfileClick}>
                {user.username || "Profile"}
              </Button>
              <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/signin')}>Sign In</Button>
              <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={openLogoutDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary"
          sx={{ 
            color: '#DB2777',
            '&:hover': { backgroundColor: '#FCE7F3' },
          }}
          >Cancel</Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus
          sx={{ 
            color:'white',
            backgroundColor: '#BE185D',
            '&:hover': { backgroundColor: '#9D174D' },
          }}
          >OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
