import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const DeactivateUser = ({ email }) => {
  return (
    <Box>
      <Typography>
        Are you sure you want to deactivate <b>{email}</b> ?
      </Typography>
    </Box>
  );
};

export default DeactivateUser;
