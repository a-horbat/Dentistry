import React, { useMemo, useEffect, useState } from 'react';
import {
  IntuitLoginDocument,
  useBooleanControls,
} from '@base86inc/apollo-client';

import Box from '@material-ui/core/Box';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import { NavLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import 'firebase/auth';
import gql from 'graphql-tag';
import Slide from '@material-ui/core/Slide';

import { auth } from 'firebase/app';
import { GoogleConnect } from '../../../components/GoogleConnect';
import Input from '../../../components/Input';
import { client } from '../../../client';
import { useAuthStyles } from '../style';
import { useButtonStyles } from '../../../MUIStyles/General';

const ForgotPassword = ({ onSetSignIn }) => {
  const classes = Object.assign(useAuthStyles(), useButtonStyles());
  const [{ email, loading, error, sent }, setState] = useState({
    loading: false,
    sent: false,
    email: '',
    error: '',
  });
  const handleEmail = (ev) => {
    const email = ev.target.value;
    setState((v) => ({ ...v, sent: false, email }));
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      setState((v) => ({ ...v, loading: true, error: '' }));
      if (!email) throw new Error('Email is required');
      await client.mutate({
        mutation: gql`
          mutation SendResetPasswordEmail($email: String!) {
            sendResetPasswordEmail(email: $email)
          }
        `,
        variables: {
          email,
        },
      });
      setState((v) => ({ ...v, sent: true, loading: false }));
    } catch (err) {
      setState((v) => ({ ...v, loading: false, error: err.message }));
    }
  };
  return (
    <>
      <h1 className={classes.title}>Forgot Password</h1>
      <span className={classes.note}>
        Enter your email and we will send you a link to reset new password.
      </span>
      <div style={{ maxWidth: '500px', width: '100%', minWidth: '400px' }}>
        <Input
          handleChange={handleEmail}
          id="sign-in_email"
          placeholder="Email"
          labelText="Email"
          type="text"
          width="large"
          style={{ marginTop: 32 }}
          Icon={MailOutlineRoundedIcon}
          value={email}
        />
        <div
          className={classes.buttonsContainer}
          style={{ marginTop: 10, marginBottom: 8 }}
        >
          <Button
            disabled={loading || sent}
            onClick={handleSubmit}
            className={classes.primaryButton}
            style={{ width: '47%' }}
          >
            {loading ? (
              <CircularProgress
                style={{ color: '#fff', marginRight: 4, height: 20, width: 20 }}
              />
            ) : null}
            Send
          </Button>
          <Button
            className={classes.secondaryButton}
            style={{ width: '47%' }}
            onClick={onSetSignIn}
          >
            Cancel
          </Button>
        </div>
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </div>
      <Slide in={sent} direction="up" mountOnEnter>
        <Box
          position="absolute"
          bgcolor="#f5f5f5"
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <h1 className={classes.title}>Reset Password Email Sent</h1>
          <span className={classes.note}>Check your email for next steps.</span>
        </Box>
      </Slide>
    </>
  );
};

const SignIn = ({ onSetResetPassword }) => {
  const classes = Object.assign(useAuthStyles(), useButtonStyles());
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const onSubmitEmailPassword = async (email, password) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      await client.resetStore();
      setLoading(false);
      setRedirect(true);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    //console.log(email, 'email');
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    //console.log('email', email, 'password', password);
  };
  const handleClick = () => {
    onSubmitEmailPassword(email, password);
  };
  const onGoogleAuth = async () => {
    try {
      const provider = new auth.GoogleAuthProvider();
      await auth().signInWithPopup(provider);
      setLoading(true);
      setRedirect(true);
      await client.resetStore();
    } catch (err) {
      setError(err.message);
    }
  };
  const onSuccess = async (code) => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: IntuitLoginDocument,
        variables: { code },
      });
      await auth().signInWithCustomToken(data.intuitLogin);
      await client.resetStore();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  if (redirect) {
    return <Redirect to="/products" />;
  }
  return (
    <>
      <h1 className={classes.title}>Sign In</h1>
      <span className={classes.note}>
        Do not have an account?{' '}
        <NavLink to="/auth/sign-up">Register Now!</NavLink>
      </span>

      <div style={{ maxWidth: '500px', width: '100%', minWidth: '400px' }}>
        <form
          className={classes.inputsContainer}
          onSubmit={() => onSubmitEmailPassword(email, password)}
        >
          <Input
            handleChange={handleChangeEmail}
            id="sign-in_email"
            placeholder="Email"
            labelText="Email"
            type="text"
            width="large"
            Icon={MailOutlineRoundedIcon}
            value={email}
            // onChange={e => console.log(e.target.value)}
          />
          <Input
            // onChange={handleChange}
            id="sign-in_password"
            placeholder="Password"
            labelText="Password"
            type="password"
            width="large"
            Icon={LockOpenRoundedIcon}
            value={password}
            handleChange={handleChangePassword}
          />
        </form>

        <span className={classes.forgotPassword}>
          <a onClick={onSetResetPassword}>Forgot password?</a>
        </span>

        <div className={classes.buttonsContainer}>
          <Button
            onClick={handleClick}
            className={classes.primaryButton}
            style={{ width: '47%' }}
          >
            Login
          </Button>
          <Button className={classes.secondaryButton} style={{ width: '47%' }}>
            Try a sneak peek
          </Button>
        </div>
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}

        <span className={classes.createWith}>Or login with</span>

        <GoogleConnect onClick={onGoogleAuth} />
      </div>
    </>
  );
};

const Component = () => {
  const [resetPassword, setResetPassword] = useBooleanControls(false);
  if (resetPassword) {
    return <ForgotPassword onSetSignIn={setResetPassword.setFalse} />;
  }
  return <SignIn onSetResetPassword={setResetPassword.setTrue} />;
};

export default Component;
