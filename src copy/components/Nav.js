import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import logo from '../logo.png';

export default ({ title, children }) => {
  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar>
          <Grid container>
            <Grid
              item
              xs={12}
              md={4}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Typography
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  fontWeight: 'bold',
                  marginRight: 12,
                  letterSpacing: 0,
                  color: '#333333',
                  fontSize: 34,
                  fontFamily: 'Comfortaa',
                }}
              >
                {title}
              </Typography>
              <Hidden mdUp>
                <img
                  src={logo}
                  alt="Base86 Logo"
                  style={{
                    padding: '4px 0',
                    height: 40,
                    alignSelf: 'center',
                    objectFit: 'cover',
                  }}
                />
              </Hidden>
            </Grid>
            <Hidden smDown>
              <Grid
                item
                sm={4}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={logo}
                  alt="Base86 Logo"
                  style={{ padding: '4px 0', height: 48, objectFit: 'cover' }}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} md={4}>
              {children}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
