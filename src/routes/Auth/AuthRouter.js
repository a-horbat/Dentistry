import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import logoImg from '../../assets/logo.png';
import authImg from '../../assets/auth.jpg';
import Actions from './Actions';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '100%',
    position: 'relative',
  },
  preview: {
    backgroundColor: 'lightgray',
    width: '55%',
    minHeight: '100%',
    backgroundImage: `url(${authImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'fixed',
  },
  previewOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.3)',
    zIndex: '1',
  },
  previewTitle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '50px',
    color: 'white',
    position: 'absolute',
    zIndex: '2',
    width: '100%',
    padding: '0 10%',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0',
  },
  formSection: {
    backgroundColor: theme.palette.background.default,
    width: '45%',
    minHeight: '100%',
    height: '100%',
    paddingTop: '85px',
    paddingLeft: '5%',
    paddingRight: '7%',
    paddingBottom: '85px',
    position: 'fixed',
    right: '0',
    top: '0',
    overflowY: 'scroll',
  },
  form: {
    padding: '0px',
    position: 'relative',
  },
  inputsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  logo: {
    width: '140px',
    height: '55px',
  },
}));

const AuthRouter = () => {
  const classes = useStyles();

  return (
    <Box classes={{ root: classes.container }}>
      <Box classes={{ root: classes.preview }}>
        <div className={classes.previewOverlay} />
        <h2 className={classes.previewTitle}>
          Do painless dental work,
          <br />
          not painful paperwork
        </h2>
      </Box>

      <Box classes={{ root: classes.formSection }}>
        <img className={classes.logo} src={logoImg} alt="Logo" />
        <form className={classes.form}>
          <Switch>
            <Route exact path="/auth/sign-up">
              <Register />
            </Route>
            <Route exact path="/auth/sign-in">
              <SignIn />
            </Route>
            <Route exact path="/auth/action">
              <Actions />
            </Route>
            <Route path="/">
              <Register />
            </Route>
          </Switch>
        </form>
      </Box>
    </Box>
  );
};

export default AuthRouter;
