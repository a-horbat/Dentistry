import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import React, { useState } from 'react';
import InboxIcon from '@material-ui/icons/Inbox';
import Typography from '@material-ui/core/Typography';
import { useBooleanControls } from '@base86inc/apollo-client';
import Grid from '@material-ui/core/Grid';
//import NavigationSearch from '../components/NavigationSearch';
import Navigation from '../components/Navigation';
import MainMenu from '../components/Menu';
import MainLayoutStyles from '../layouts/MainLayout/MainLayoutStyles';

export default React.memo(({ title }) => {
  const classes = MainLayoutStyles();

  const [searchText, setSearchText] = useState('');
  const [filterOpen, filterControls] = useBooleanControls(false);
  return (
    <Grid item className={classes.bodyGrid__item}>
      <Navigation title={title || 'Not Found'} />
      <Box textAlign="center" pt={4}>
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
    </Grid>
  );
});
