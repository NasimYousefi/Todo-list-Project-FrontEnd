import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteConfirmation = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this task?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}  
        sx={{ 
          color: '#DB2777',
          '&:hover': { backgroundColor: '#FCE7F3' },
        }}>
          Cancel
        </Button>
        <Button onClick={onConfirm}  variant="contained"
        sx={{ 
          color:'white',
          backgroundColor: '#BE185D',
          '&:hover': { backgroundColor: '#9D174D' },
        }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;