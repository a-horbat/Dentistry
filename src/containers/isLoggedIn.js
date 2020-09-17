import React, { useEffect } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import { PersistentMenu } from '../components/Menu/PersistentMenu';
import Navigation from '../components/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { SidebarProvider } from '../utils/sidebarContext';

const sidebarInitiallyOpen =
  window.localStorage.getItem('sidebarOpen') === 'true';
const IsLoggedIn = ({ children, setOpenMenu }) => {
  const [open, mainController] = useBooleanControls(sidebarInitiallyOpen);

  useEffect(() => {
    window.localStorage.setItem('sidebarOpen', open);
  }, [open]);

  const useStyles = makeStyles(theme => ({
    mainContainer: {
      marginLeft: open ? 225 : 73,
      padding: 25,
      paddingTop: 0,
      paddingBottom: 30,
      backgroundColor: theme.palette.mainBackground.main,
      height: '100%',
      transition: 'all .25s',
    },
  }));

  const classes = useStyles();

  return (
    <SidebarProvider value={open}>
      <Box className={classes.mainContainer}>
        <PersistentMenu mainController={mainController} openMenu={open} />
        {children}
      </Box>
    </SidebarProvider>
  );
};

export default IsLoggedIn;
