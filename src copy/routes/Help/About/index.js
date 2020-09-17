import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import MainMenu, { usePersistentMenuStyles } from '../../../components/Menu';
import Nav from '../../../components/Nav';
import AboutIcon from '../../../components/MenuIcons/About';
import Typography from '@material-ui/core/Typography';

export default () => {
  const classes = usePersistentMenuStyles();
  return (
    <Box className={classes.mainContainer}>
      <Nav title="About" />
      <Box flexGrow={1} textAlign="center" pt={4}>
        <Typography style={{ color: '#bdbdbd' }}>
          <AboutIcon style={{ height: 120, width: 120 }} />
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
