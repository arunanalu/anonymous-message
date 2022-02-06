import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function LoginMessage({message}) {
  return <Box>
    <Typography variant='h3'>{message}</Typography>
  </Box>
}

export default LoginMessage;
