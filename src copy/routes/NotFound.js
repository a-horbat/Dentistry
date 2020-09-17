import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import MainMenu from '../components/Menu';
import { usePersistentMenuStyles } from '../components/Menu/usePersistentMenuStyles';
import Nav from '../components/Nav';
import InboxIcon from '@material-ui/icons/Inbox';
import Typography from '@material-ui/core/Typography';

export default () => {
  const classes = usePersistentMenuStyles();
  return (
    <Box className={classes.mainContainer}>
      <Nav title="Not Found" />
      <Box flexGrow={1} textAlign="center" pt={4}>
        <Typography style={{ color: '#bdbdbd' }}>
          <InboxIcon style={{ height: 120, width: 120 }} />
        </Typography>
        <Typography>There is nothing here.</Typography>
      </Box>
      <Hidden mdUp>
        <div style={{ paddingBottom: 120 }} />
        <div
          style={{
            position: 'fixed',
            padding: 24,
            bottom: 0,
            left: 0,
            zIndex: 11,
          }}
        >
          <MainMenu />
        </div>
      </Hidden>
    </Box>
  );
};
